import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import {CarService} from "../cars/shared/car.service";
import {HttpClient} from "@angular/common/http";

describe('ChartComponent', () => {
  let httpClient = TestBed.inject(HttpClient);
  let service: CarService = new CarService(httpClient);
  let component: ChartComponent = new ChartComponent(service);
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
