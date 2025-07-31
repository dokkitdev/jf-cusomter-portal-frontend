import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { FormDatepickerComponentState } from './form-datepicker.state';
import { Observable } from 'rxjs';

@Injectable()
export class FormDatepickerFacade {
  public get isOpened$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isOpened);
  }

  constructor(private readonly componentStore: ComponentStore<FormDatepickerComponentState>) {
    this.resetState();
  }

  public resetState(): void {
    this.componentStore.setState(new FormDatepickerComponentState());
  }

  public open(): void {
    this.updateStateIsOpened(true);
  }

  public close(): void {
    this.updateStateIsOpened(false);
  }

  private updateStateIsOpened(isOpened: boolean): void {
    this.componentStore.updater((state) => ({
      ...state,
      isOpened
    }))();
  }
}
