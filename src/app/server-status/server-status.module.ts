import {NgModule} from "@angular/core";
import {CarComponent} from "../cars/car/car.component";
import {CarListComponent} from "../cars/car-list/car-list.component";
import {CommonModule} from "@angular/common";
import {CarService} from "../cars/shared/car.service";
import {ServerStatusComponent} from "./server-status.component";


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ServerStatusComponent,

  ],
  providers: [

  ],
  exports: [
    ServerStatusComponent
  ]
})

export class ServerStatusModule{}
