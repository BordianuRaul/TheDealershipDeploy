import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ChartComponent} from "./chart.component";
import {GoogleChartsModule} from "angular-google-charts";


@NgModule({
  declarations: [
    ChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GoogleChartsModule
  ],
  providers: [

  ],
  exports: [
    ChartComponent
  ]
})

export class ChartModule{}
