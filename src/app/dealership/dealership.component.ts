import {Component, Input} from '@angular/core';
import {Car} from "../cars/shared/car.model";
import {Dealership} from "./shared/dealership.model";

@Component({
  selector: 'app-dealership',
  standalone: true,
  imports: [],
  templateUrl: './dealership.component.html',
  styleUrl: './dealership.component.css'
})
export class DealershipComponent {

  @Input() dealership!: Dealership;

  constructor() {
  }

}
