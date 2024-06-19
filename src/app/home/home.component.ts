import {Component, OnInit} from '@angular/core';
import {AddFormComponent} from "../add-form/add-form.component";
import {CarsModule} from "../cars/cars.module";
import {ChartModule} from "../chart/chart.module";
import {NetworkStatusComponent} from "../network-status/network-status.component";
import {ServerStatusComponent} from "../server-status/server-status.component";
import {CarService} from "../cars/shared/car.service";
import {LoginService} from "../loginPage/shared/login.service";
import {Router} from "@angular/router";
import {TopBarComponent} from "../top-bar/top-bar.component";
import {LeftSideNavBarComponent} from "../left-side-nav-bar/left-side-nav-bar.component";
import {ModalComponent} from "../modal/modal.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AddFormComponent,
    CarsModule,
    ChartModule,
    NetworkStatusComponent,
    ServerStatusComponent,
    TopBarComponent,
    LeftSideNavBarComponent,
    ModalComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  isNetworkAvailable: boolean;
  isChartModalVisible: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private carService: CarService, private router: Router) {
    this.isNetworkAvailable = false;
  }

  ngOnInit() {
    this.carService.checkNetworkStatus().subscribe(
      (isAvailable) => {
        this.isNetworkAvailable = isAvailable;
      }
    );
    this.subscriptions.add(
      this.carService.isChartVisible$.subscribe(
        (isVisible) => {
          this.isChartModalVisible = isVisible;
        }
      )
    );
  }

  showChartModal() {
    this.carService.setChartVisibility(true);
  }

  closeChartModal() {
    this.carService.setChartVisibility(false);
  }


}
