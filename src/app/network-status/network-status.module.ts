import {NgModule} from "@angular/core";
import {CarComponent} from "../cars/car/car.component";
import {CarListComponent} from "../cars/car-list/car-list.component";
import {CommonModule} from "@angular/common";
import {CarService} from "../cars/shared/car.service";
import {NetworkStatusComponent} from "./network-status.component";



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    NetworkStatusComponent

  ],
  providers: [

  ],
  exports: [
    NetworkStatusComponent
  ]
})

export class NetworkStatusModule{}
