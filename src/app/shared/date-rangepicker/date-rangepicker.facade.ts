import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { FormDateRangepickerComponentState } from './date-rangepicker.state';
import { DatepickerDropdownPositionY } from '@angular/material/datepicker';
import { Observable } from 'rxjs';

@Injectable()
export class DateRangepickerFacade {
  public get isOpened$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isOpened);
  }

  public get positionY$(): Observable<DatepickerDropdownPositionY> {
    return this.componentStore.select((state) => state.positionY);
  }

  private updateStateIsOpened: (isOpened: boolean) => void;
  private updateStatePositionY: (positionY: DatepickerDropdownPositionY) => void;

  constructor(
    private readonly componentStore: ComponentStore<FormDateRangepickerComponentState>
  ) {
    this.resetState();

    this.registerUpdateStateIsOpened();
    this.registerUpdateStatePositionY();
  }

  public resetState(): void {
    this.componentStore.setState(new FormDateRangepickerComponentState());
  }

  public open(): void {
    this.updateStateIsOpened(true);
  }

  public close(): void {
    this.updateStateIsOpened(false);
  }

  public changePositionY(positionY: DatepickerDropdownPositionY): void {
    this.updateStatePositionY(positionY);
  }

  private registerUpdateStateIsOpened(): void {
    this.updateStateIsOpened = (isOpened: boolean) => this.componentStore
      .updater(
        (state) => ({
          ...state,
          isOpened
        })
      )();
  }

  private registerUpdateStatePositionY(): void {
    this.updateStatePositionY = (positionY: DatepickerDropdownPositionY) => this.componentStore
      .updater(
        (state) => ({
          ...state,
          positionY
        })
      )();
  }
}
