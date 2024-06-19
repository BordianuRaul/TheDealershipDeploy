import {Component} from "@angular/core";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})

export class PopUpComponent{
  popupText: string = '';

  setPopupText(text: string) {
    this.popupText = text;
  }

  closePopup() {
    this.popupText = ''; // Clear the popup text to close the popup
  }
}
