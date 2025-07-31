import { DatepickerDropdownPositionY } from '@angular/material/datepicker';

export class FormDateRangepickerComponentState {
  public isOpened: boolean;
  public positionY: DatepickerDropdownPositionY;

  constructor() {
    this.isOpened = false;
    this.positionY = 'below';
  }
}
