import { Component } from '@angular/core';
import {TopBarComponent} from "../top-bar/top-bar.component";
import {LeftSideNavBarComponent} from "../left-side-nav-bar/left-side-nav-bar.component";
import {CarService} from "../cars/shared/car.service";
import {Router} from "@angular/router";
import {AddFormComponent} from "../add-form/add-form.component";

@Component({
  selector: 'app-add-car-page',
  standalone: true,
  imports: [
    TopBarComponent,
    LeftSideNavBarComponent,
    AddFormComponent
  ],
  templateUrl: './add-car-page.component.html',
  styleUrl: './add-car-page.component.css'
})
export class AddCarPageComponent {

  constructor(private carService: CarService, private router: Router) {
  }

}
