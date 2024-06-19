import {NgModule} from "@angular/core";
import {DeleteButtonComponent} from "../deleteButton/delete-button.component";
import {CommonModule} from "@angular/common";
import {PopUpComponent} from "./pop-up.component";

NgModule({
  declarations: [
    PopUpComponent
  ],
  imports:[
    CommonModule
  ],
  providers: [

  ],
  exports: [
    PopUpComponent
  ]
})

export class PopUpModule{}
