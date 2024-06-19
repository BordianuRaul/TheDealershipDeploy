import {Component, OnInit} from '@angular/core';
import {CarService} from "../cars/shared/car.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-network-status',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './network-status.component.html',
  styleUrl: './network-status.component.css'
})
export class NetworkStatusComponent implements OnInit {
  isConnected: boolean;

  constructor(private carService: CarService) {
    this.isConnected = false;
  }

  ngOnInit() {
    this.carService.checkNetworkStatus().subscribe(
      (isConnected) => {
        this.isConnected = isConnected;
      }
    );
  }
}
