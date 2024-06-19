import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";
import {ChartModule} from "../chart/chart.module";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgClass,
    ChartModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }
}
