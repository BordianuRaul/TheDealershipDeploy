import {Dealership} from "../../dealership/shared/dealership.model";

export class Car{

  id: number;
  model: string;
  brand: string;
  year: number;
  dealership: Dealership;

  constructor(id:number, model:string, brand:string, year:number, dealership: Dealership) {
    this.id = id;
    this.model = model;
    this.brand = brand;
    this.year = year;
    this.dealership = dealership;
  }

  toString(): string {
    return `
    Brand: ${this.brand}
    Model: ${this.model}
    Year: ${this.year}`;
  }

  getModel(): string{
    return this.model;
  }

  getBrand(): string{
    return this.brand;
  }

  getYear(): number{
    return this.year;
  }

  setModel(model: string): void {
    this.model = model;
  }

  setBrand(brand: string): void {
    this.brand = brand;
  }

  setYear(year: number): void {
    this.year = year;
  }

}
