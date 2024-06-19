import {NgModule} from "@angular/core";
import {CarComponent} from "../cars/car/car.component";
import {CarListComponent} from "../cars/car-list/car-list.component";
import {CommonModule} from "@angular/common";
import {CarService} from "../cars/shared/car.service";
import {DeleteButtonComponent} from "./delete-button.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    DeleteButtonComponent
  ],
    imports: [
        CommonModule,
        FaIconComponent
    ],
  providers: [

  ],
  exports: [
    DeleteButtonComponent
  ]
})

export class DeleteButtonModule{}
