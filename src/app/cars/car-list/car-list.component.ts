import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import { Car } from '../shared/car.model';
import { CarService } from '../shared/car.service';
import {Subscription} from "rxjs";
import { faCar } from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})

export class CarListComponent implements OnInit, OnDestroy{
  cars: Car[];
  currentPage: number = 1;
  carsPerPage: number = 50;
  private carsSubscription!: Subscription;

  @Output() carSelected: EventEmitter<Car> = new EventEmitter<Car>();
  @ViewChild('carListContainer', { static: true }) carList!: ElementRef;

  constructor(private carService: CarService, private router: Router) {
    this.cars = this.carService.getAll();
  }

  ngOnInit() {
    this.carsSubscription = this.carService.cars$.subscribe(cars => {
      this.cars = this.carService.getAll();
    });
    window.addEventListener('scroll', this.onScroll.bind(this));
  }
  refreshCars(){
    this.cars = this.carService.getAll();
  }
  onDelete(car: Car) {
    this.carService.delete(car);
    this.refreshCars();
  }
  ngOnDestroy() {
    this.carsSubscription.unsubscribe();
  }
  selectCar(car: Car) {
    this.saveCarToStorage(car);
  }
  saveCarToStorage(car: Car) {
    localStorage.setItem('selectedCar', JSON.stringify(car));
  }

  sortAscending(){
    this.carService.sortAscending();
    this.refreshCars();
  }

  nextPage() {
    this.carService.incrementCurrentPageNumber();
  }

  loadMoreCars(): void{

    this.nextPage();
    this.cars.concat(this.carService.getCarsFromCurrentPage());

  }

  onScroll(): void {

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1) {
      this.loadMoreCars();
    }
  }

  moveToUpdateACarPage(){
    this.router.navigate(['update-a-car']);
  }


}
