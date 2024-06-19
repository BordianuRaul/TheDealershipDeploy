import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {AddFormComponent} from "./add-form/add-form.component";
import {CarService} from "./cars/shared/car.service";
import {CarListComponent} from "./cars/car-list/car-list.component";
import {Car} from "./cars/shared/car.model";
import {HttpClient} from "@angular/common/http";



  it('should add a car', () => {

      const fixture = TestBed.createComponent(AddFormComponent);
      const app: AddFormComponent = fixture.componentInstance;

      let httpClient = TestBed.inject(HttpClient);
  let service: CarService = new CarService(httpClient);
      app.year = 1900;
      app.brand = 'test';
      app.model = 'data';
      app.submitForm();
      expect(app.size()).toEqual(31);

  });

  it('should delete a car', () => {

    const fixture = TestBed.createComponent(AddFormComponent);
    const app: AddFormComponent = fixture.componentInstance;
    let httpClient = TestBed.inject(HttpClient);
  let service: CarService = new CarService(httpClient);

    let car = new Car(31, 'data', 'test', 1900);
    service.add('data', 'test', 1900);
    expect(service.size()).toEqual(31);
    service.delete(car);
    expect(app.size()).toEqual(30);

  });

  it('should update a car', () => {

    const fixture = TestBed.createComponent(AddFormComponent);
    const app: AddFormComponent = fixture.componentInstance;
    let httpClient = TestBed.inject(HttpClient);
  let service: CarService = new CarService(httpClient);

    let car = new Car(31, 'data', 'test', 1900);
    service.add('data', 'test', 1900);
    expect(service.size()).toEqual(31);
    service.update(car, 'newModel', 'newBrand', 1901);
    expect(service.getAll()[30].brand).toEqual('newBrand');
    expect(service.getAll()[30].model).toEqual('newModel');
    expect(service.getAll()[30].year).toEqual(1901);

  });

it('should emit error message when model or brand is empty during add', () => {
  const fixture = TestBed.createComponent(AddFormComponent);
  const app: AddFormComponent = fixture.componentInstance;
  let httpClient = TestBed.inject(HttpClient);
  let service: CarService = new CarService(httpClient);

  let emittedError: string | undefined;
  service.error$.subscribe(error => {
    emittedError = error;
  });

  service.add('', 'Toyota', 2020);
  expect(emittedError).toEqual('Model and brand cannot be empty');
});

it('should emit error message when year is earlier than 1886 during add', () => {
  const fixture = TestBed.createComponent(AddFormComponent);
  const app: AddFormComponent = fixture.componentInstance;
  let httpClient = TestBed.inject(HttpClient);
  let service: CarService = new CarService(httpClient);

  let emittedError: string | undefined;
  service.error$.subscribe(error => {
    emittedError = error;
  });

  service.add('Camry', 'Toyota', 1800);
  expect(emittedError).toEqual('Year must be 1700 or later');
});
