import {Car} from "../../cars/shared/car.model";


export class Dealership{
  id: number;
  name: string;
  cars: Car[]

  constructor(id: number, name: string, cars: Car[]){
    this.id = id;
    this.name = name;
    this.cars = cars;
  }
}
