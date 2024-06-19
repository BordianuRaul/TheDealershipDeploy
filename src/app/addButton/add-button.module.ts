import {AddButtonComponent} from "./add-button.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AddButtonComponent
  ],
  imports:[
    CommonModule,
    FormsModule
  ],
  providers: [

  ],
  exports: [
    AddButtonComponent
  ]
})

export class AddButtonModule{}
