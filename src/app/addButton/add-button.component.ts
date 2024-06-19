import {Component} from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})

export class AddButtonComponent{
  constructor(private router: Router) {}

}
