import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AddButtonModule} from "../addButton/add-button.module";
import {CarService} from "../cars/shared/car.service";
import {Car} from "../cars/shared/car.model";
import {Subscription} from "rxjs";
import {UpdateButtonModule} from "../update-button/update-button.module";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-add-form',
  standalone: true,
  imports: [
    FormsModule,
    AddButtonModule,
    UpdateButtonModule,
    NgIf
  ],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css'
})
export class AddFormComponent implements OnDestroy, OnInit{

  model: string;
  brand: string;
  year: number;
  selectedCar!: Car ;


  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();
  currentRoute?: string;

  constructor(private carService: CarService, private router: Router) {
    this.model = '';
    this.brand = '';
    this.year = -1;

    this.loadCarFromStorage();
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });

  }
  ngOnInit() {

  }

  private loadCarFromStorage(): void {
    const carData = localStorage.getItem('selectedCar');
    if (carData) {
      const car: Car = JSON.parse(carData);
      this.updateFormData(car);
      this.selectedCar = car;
      localStorage.removeItem('selectedCar');
    }
  }

  submitForm() {
    this.carService.add(this.model, this.brand, this.year);
    this.formSubmitted.emit();
    this.router.navigate(['Home']);
  }

  submitUpdate(){
    this.carService.update(this.selectedCar, this.model, this.brand, this.year);
    this.router.navigate(['Home']);
  }
  ngOnDestroy() {

  }
  private updateFormData(car: Car): void {
    this.model = car.model;
    this.brand = car.brand;
    this.year = car.year;
  }

  size():number{
    return this.carService.size();
  }
}
