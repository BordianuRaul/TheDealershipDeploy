import {NgModule} from "@angular/core";
import {UpdateButtonComponent} from "./update-button.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UpdateButtonComponent
  ],
  imports:[
    CommonModule,
    FormsModule
  ],
  providers: [

  ],
  exports: [
    UpdateButtonComponent
  ]
})

export class UpdateButtonModule{}
