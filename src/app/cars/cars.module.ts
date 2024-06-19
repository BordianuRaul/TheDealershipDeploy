import {NgModule} from "@angular/core";
import {CarComponent} from "./car/car.component";
import {CarListComponent} from "./car-list/car-list.component";
import {CommonModule} from "@angular/common";
import {CarService} from "./shared/car.service";
import {DeleteButtonModule} from "../deleteButton/delete-button.module";
import {AddButtonModule} from "../addButton/add-button.module";
import {FormsModule} from "@angular/forms";
import {UpdateButtonModule} from "../update-button/update-button.module";
import {SortButtonComponent} from "../sort-button/sort-button.component";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    CarComponent,
    CarListComponent
  ],
    imports: [
        CommonModule,
        DeleteButtonModule,
        AddButtonModule,
        FormsModule,
        AddButtonModule,
        UpdateButtonModule,
        SortButtonComponent,
        HttpClientModule,
        FaIconComponent

    ],
  providers: [

  ],
    exports: [
        CarListComponent,
        CarComponent
    ]
})

export class CarsModule{}
