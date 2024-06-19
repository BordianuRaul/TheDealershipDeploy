import { Component } from '@angular/core';
import {NetworkStatusComponent} from "../network-status/network-status.component";
import {ServerStatusComponent} from "../server-status/server-status.component";
import {Router} from "@angular/router";
import {LoginService} from "../loginPage/shared/login.service";
import {NgOptimizedImage} from "@angular/common";
import {CarService} from "../cars/shared/car.service";

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    NetworkStatusComponent,
    ServerStatusComponent,
    NgOptimizedImage
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {

  constructor(private router: Router, private loginService: LoginService, private carService: CarService) {
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['']);
  }

  navigateToHome() {
    this.router.navigate(['Home']);
    this.carService.getAllFromBackend();
  }
}
