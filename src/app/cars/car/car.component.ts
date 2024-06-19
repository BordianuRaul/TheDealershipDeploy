import {Component, Input, OnInit} from '@angular/core';
import { Car } from '../shared/car.model';
import { CarService } from '../shared/car.service';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent{
  @Input() car!: Car;
  faCar = faCar;
  faCalendarDays = faCalendarDays;
  hovered: boolean = false;

  constructor() { }

  onDelete($event: Car) {

  }
}
