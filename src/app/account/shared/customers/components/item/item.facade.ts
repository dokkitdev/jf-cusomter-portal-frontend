import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { GroupFilters } from '@shared/group';
import { Actions, formControlReducer, FormControlState, setValue } from 'ngrx-forms';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AccountCustomersItemComponentState } from './item.state';

@Injectable()
export class AccountCustomersItemComponentFacade {
  public get controlState$(): Observable<FormControlState<number>> {
    return this.componentStore.select((state) => state.controlState);
  }

  public get customerControlState$(): Observable<FormControlState<number>> {
    return this.componentStore.select((store) => store.customerControlState);
  }

  public get simproCustomerID$(): Observable<number> {
    return this.componentStore.select((state) => state.customerControlState.value);
  }

  public get groupFilters$(): Observable<GroupFilters> {
    return this
      .simproCustomerID$
      .pipe(
        map((simproCustomerID) => new GroupFilters({
          simproCustomerID: simproCustomerID
        }))
      );
  }

  public selectValue: Subject<number> = new Subject();

  constructor(
    private readonly componentStore: ComponentStore<AccountCustomersItemComponentState>
  ) {
    this.resetState();

    this.registerSelectValueEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountCustomersItemComponentState());
  }

  public handleCustomerControlStateAction(action: Actions<any>): void {
    this.updateCustomerControlState(action);
  }

  public setControlState(controlState: FormControlState<number>): void {
    this.updateControlState(controlState);
  }

  public setCustomer(id: number): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        customerControlState: setValue(state.customerControlState, id)
      })
    )();
  }

  private updateControlState(controlState: FormControlState<number>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        controlState
      })
    )();
  }

  private updateCustomerControlState(action: Actions<any>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        customerControlState: formControlReducer(state.customerControlState, action)
      })
    )();
  }

  private registerSelectValueEffect(): void {
    this.componentStore.effect(() =>
      this
        .simproCustomerID$
        .pipe(
          tap((simproCustomerID) => this.selectValue.next(simproCustomerID))
        )
    );
  }
}
