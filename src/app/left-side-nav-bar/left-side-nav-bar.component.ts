import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";
import {faPieChart} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CarService} from "../cars/shared/car.service";

@Component({
  selector: 'app-left-side-nav-bar',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './left-side-nav-bar.component.html',
  styleUrl: './left-side-nav-bar.component.css'
})
export class LeftSideNavBarComponent {
    faPieChart = faPieChart;
    @Output() showChartModal = new EventEmitter<void>();
    constructor(private router:Router, private carService: CarService) {

    }
    moveToAddACarPage(){
      this.router.navigate(['add-a-car']);
    }

    onShowChartModal() {
      this.carService.setChartVisibility(true);
    }
}
