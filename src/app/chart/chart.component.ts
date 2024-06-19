import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarService} from "../cars/shared/car.service";
import {Car} from "../cars/shared/car.model";
import { ChartType } from 'angular-google-charts';
import {ChartOptions} from "chart.js";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnDestroy{

  chartData:any[] = [];
  chartType: ChartType = ChartType.PieChart;
  columns = ['Car Brand', 'Number Of Models'];
  chartOptions = {
    width: 500,
    height: 500,
    'backgroundColor': 'transparent',
    legend: { position: 'none' },
    slices: {
      0: { borderWidth: 0 },
      1: { borderWidth: 0 },

    }

  };

  private carsSubscription!: Subscription;

  constructor(private service: CarService) {
    this.carsSubscription = this.service.cars$.subscribe(cars => {
      this.updateChartData(this.service.getAll());
    });

  }

  ngOnDestroy(): void {
      this.carsSubscription.unsubscribe();
    }


  updateChartData(cars: Car[]): void {
    this.chartData = [];

    let brandModelCounts = this.getBrandModelCounts(cars);
    for (const car of brandModelCounts) {
      this.chartData.push([car.brand, car.modelCount]);
    }
  }

  getBrandModelCounts(cars: Car[]): { brand: string, modelCount: number }[] {
    const brandModelCounts: { [brand: string]: number } = {};

    cars.forEach(car => {
      if (brandModelCounts[car.brand]) {
        brandModelCounts[car.brand]++;
      } else {
        brandModelCounts[car.brand] = 1;
      }
    });

    const result: { brand: string, modelCount: number }[] = [];
    for (const brand in brandModelCounts) {
      if (brandModelCounts.hasOwnProperty(brand)) {
        result.push({ brand, modelCount: brandModelCounts[brand] });
      }
    }

    return result;
  }
}
