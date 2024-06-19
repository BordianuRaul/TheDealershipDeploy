import {Component, Output, EventEmitter, Input} from '@angular/core';
import {Car} from "../cars/shared/car.model";
import {CarService} from "../cars/shared/car.service";
import {faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})

export class DeleteButtonComponent{
  @Output() delete: EventEmitter<Car> = new EventEmitter<Car>();
  @Input() car!: Car;

  faTrash = faTrash;

  constructor(private carService: CarService) {
  }

  onDelete(event: Event){
    event.stopPropagation();
    this.carService.delete(this.car);
    this.delete.emit(this.car);
  }
}
