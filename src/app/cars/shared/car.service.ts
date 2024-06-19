import { Injectable } from '@angular/core';
import { Car } from './car.model'
import {
  BehaviorSubject,
  catchError,
  fromEvent,
  fromEventPattern,
  interval,
  map, mapTo,
  merge,
  Observable,
  of,
  Subscription
} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Dealership} from "../../dealership/shared/dealership.model";
import {DealershipComponent} from "../../dealership/dealership.component";


@Injectable({
  providedIn: 'root'
})

export class CarService{

  private carsSubject: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([]);
  cars$ = this.carsSubject.asObservable();

  private selectedCarSubject: BehaviorSubject<Car | null> = new BehaviorSubject<Car | null>(null);
  selectedCar$: Observable<Car | null> = this.selectedCarSubject.asObservable();

  private errorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  error$: Observable<string> = this.errorSubject.asObservable();

  private isChartVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isChartVisible$: Observable<boolean> = this.isChartVisibleSubject.asObservable();

  dealership: Dealership;
  private dealershipID: number = 1000;
  private currentPage: number;
  private carsPerPage: number = 50;
  private cars: Car[];
  private queuedAdditions: Car[];
  idCount: number;
  selectedCar: Car | null = null;
  private baseUrl = 'http://localhost:8080/api/cars';

  constructor(private http: HttpClient) {
    this.dealership = new Dealership(0, "ClujCars", []);
    this.idCount = 0;
    this.currentPage = 0;
    this.cars =  [];
    this.queuedAdditions = [];

    const queuedAdditionsJson = localStorage.getItem('queuedAdditions');
    if (queuedAdditionsJson) {
      this.queuedAdditions = JSON.parse(queuedAdditionsJson);
    }
    this.checkServerStatus();
    this.getAllFromBackend();
    this.syncDataToServer();
  }

  public getAllFromBackend(): void {
    this.idCount = 0;
    this.cars = [];
    for(let pageNr = 0; pageNr <= this.currentPage; pageNr++) {
      let URL = `http://localhost:8080/api/cars/getCarsForDealershipPagination?id=${this.dealershipID}&page=${pageNr}&size=${this.carsPerPage}`;
      this.http.get<Car[]>(URL).subscribe(
        (response) => {
          this.carsSubject.next(this.cars);
          response.forEach((car: Car) => {
            this.refreshAdd(car.id, car.model, car.brand, car.year);
          });
        },
        (error) => {
          console.error('Error fetching cars from the backend:', error);
          this.errorSubject.next('Error fetching cars from the backend');
        }
      );
    }
  }


  getAll(): Car[] {
    return this.cars;
  }

  refreshAdd(id:number, model:string, brand:string, year:number): void{

    let newCar = new Car(id, model, brand, year, this.dealership);
    for (const car of this.cars) {
      if (car.id === newCar.id) {
        return;
      }
    }
    this.cars.push(newCar);
    this.emitCars();
  }

  add(model: string, brand: string, year: number): void {

    const params = {
      dealershipId: this.dealershipID,
      model: model,
      brand: brand,
      year: year
    };

    let serverStatus: boolean;

    this.checkServerStatus().subscribe((status: boolean) => {
      serverStatus = status;

      if (serverStatus) {
        this.http.post<any>('http://localhost:8080/api/cars/saveCarToDealership', null, { params: params }).subscribe(
          () => {
            this.getAllFromBackend();
          },
          (error: HttpErrorResponse) => {
            if (error.status === 400) {
              alert("Only Ford makes mustangs!");
            }
          }
        );
      } else {
        const newCar: Car = new Car(0, model, brand, year, this.dealership);
        this.addToQueuedAdditions(newCar);
      }
    });
  }

  delete(car: Car): void{
    const deleteUrl = `${this.baseUrl}`;
    this.http.request('delete', deleteUrl, { body: car }).subscribe(
      () => {
        this.getAllFromBackend();
      },
      (error) => {
        console.error('Error deleting car:', error);

      }
    );
  }

  update(car: Car , newModel: string, newBrand: string, newYear: number){

    if (newModel.trim() == '' || newBrand.trim() == '') {
      this.errorSubject.next('Model and brand cannot be empty');
      return;
    }
    if (newYear < 1886) {
      this.errorSubject.next('Year must be 1700 or later');
      return;
    }
    const params = {
      model: newModel,
      brand: newBrand,
      year: newYear
    };
    this.http.put(this.baseUrl,car, {params: params}).subscribe(
      () => {
        this.getAllFromBackend();
      },
      (error) => {
        console.error('Error update car:', error);
      }
    );

  }

  getCarById(id: number): Observable<Car> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Car>(`${this.baseUrl}/id`, { params });
  }

  private emitCars(): void {
    this.carsSubject.next([...this.cars]);
  }

  selectCar(car: Car) {
    this.selectedCarSubject.next(car);
  }

  clearSelectedCar() {
    this.selectedCarSubject.next(null);
  }
  size(): number{
    return this.cars.length;
  }
  sortAscending() {
    this.cars.sort((car1, car2) => {
      if (car1.year < car2.year) {
        return -1;
      } else if (car1.year > car2.year) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  getAllRange(startIndex: number, endIndex: number): Car[] {
    return this.cars.slice(startIndex, endIndex);
  }

  checkServerStatus(): Observable<boolean> {
    const URL =  `http://localhost:8080/api/cars/getCarsForDealershipPagination?id=${this.dealershipID}&page=${this.currentPage}&size=50`;

    return this.http.get(URL).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }


  checkNetworkStatus(): Observable<boolean> {
    const online$ = fromEventPattern<boolean>(
      handler => window.addEventListener('online', handler),
      handler => window.removeEventListener('online', handler)
    ).pipe(mapTo(true));

    const offline$ = fromEventPattern<boolean>(
      handler => window.addEventListener('offline', handler),
      handler => window.removeEventListener('offline', handler)
    ).pipe(mapTo(false));

    const fetchOnline$ = new Observable<boolean>(observer => {
      fetch('https://www.example.com', { method: 'HEAD', mode: 'no-cors' })
        .then(() => observer.next(true))
        .catch(() => observer.next(false));
    });

    return merge(online$, offline$, fetchOnline$).pipe(
      catchError(() => of(false))
    );

  }

  private syncDataToServer(): void{
    let serverStatus = false;

    this.checkServerStatus().subscribe((status: boolean) => {
      serverStatus = status;

      if(this.queuedAdditions.length > 0 && serverStatus){
        this.queuedAdditions.forEach((car : Car ) => {

          this.add(car.model, car.brand, car.year);

        })
        this.removeFromQueuedAdditions();
      }
    });

  }

  private addToQueuedAdditions(car: Car): void {
    this.queuedAdditions.push(car);
    this.updateQueuedAdditionsInStorage();
  }

  private updateQueuedAdditionsInStorage(): void {
    localStorage.setItem('queuedAdditions', JSON.stringify(this.queuedAdditions));
  }

  private removeFromQueuedAdditions(): void {
    this.queuedAdditions = [];
    this.updateQueuedAdditionsInStorage();
  }

  public setCurrentPageNumber(page: number): void{
    this.currentPage = page;
  }

  public incrementCurrentPageNumber() : void{
    this.currentPage++;
    this.getAllFromBackend();
  }

  public decrementCurrentPageNumber() : void{
    this.currentPage--;
    this.getAllFromBackend();
  }

  public getCarsFromCurrentPage(): Car[]{
    return this.cars.slice(-this.carsPerPage);
  }

  setChartVisibility(isVisible: boolean): void {
    this.isChartVisibleSubject.next(isVisible);
  }
}
