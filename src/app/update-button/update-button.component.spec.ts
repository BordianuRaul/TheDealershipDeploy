import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateButtonComponent } from './update-button.component';
import {CarService} from "../cars/shared/car.service";

describe('UpdateButtonComponent', () => {
  let component: UpdateButtonComponent = new UpdateButtonComponent();
  let fixture: ComponentFixture<UpdateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
