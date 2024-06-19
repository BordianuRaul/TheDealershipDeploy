import {Component, OnInit} from '@angular/core';
import {CarService} from "../cars/shared/car.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit {
  isConnected: boolean;

  constructor(private carService: CarService) {
    this.isConnected = false;
  }

  ngOnInit() {
    this.carService.checkServerStatus().subscribe(
      (isConnected) => {
        this.isConnected = isConnected;
      }
    );
  }
}
