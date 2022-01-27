import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Actions, AddArrayControlAction, FormArrayState, MarkAsSubmittedAction, RemoveArrayControlAction, SetUserDefinedPropertyAction } from 'ngrx-forms';
import { Observable, Subject } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';
import { AccountCustomersComponentState } from './customers.state';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AccountCustomersComponentFacade {
  public get controlState$(): Observable<FormArrayState<number>> {
    return this.componentStore.select((store) => store.controlState);
  }

  public get excludeCustomerID$(): Observable<Array<number>> {
    return this.componentStore.select((store) => store.excludeCustomerID);
  }

  public controlStateActionTriggered: Subject<Actions<any>> = new Subject();

  private addNewItemEffect$: () => Observable<void>;
  private removeItemEffect$: (index: number) => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountCustomersComponentState>
  ) {
    this.resetState();

    this.registerAddNewItemEffect();
    this.registerRemoveItemEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountCustomersComponentState());
  }

  public addNewItem(): void {
    this.addNewItemEffect$();
  }

  public removeItem(index: number): void {
    this.removeItemEffect$(index);
  }

  public setControlState(controlState: FormArrayState<number>): void {
    this.updateControlState(controlState);
  }

  public setExcludeCustomerID(id: number, index: number): void {
    this.updateExcludeCustomerID(id, index);
  }

  private updateControlState(controlState: FormArrayState<number>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        controlState
      })
    )();
  }

  private updateExcludeCustomerID(id: number, index: number): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        excludeCustomerID: (() => {
          const newArray = [...state.excludeCustomerID];
          newArray[index] = id;

          return newArray;
        })()
      })
    )();
  }

  private registerAddNewItemEffect(): void {
    this.addNewItemEffect$ = this.componentStore.effect((origin$: Observable<void>) =>
      origin$.pipe(
        withLatestFrom(
          this.controlState$
        ),
        tap(([_, controlState]) => {
          this.controlStateActionTriggered.next(new AddArrayControlAction(controlState.id, 0));
          this.controlStateActionTriggered.next(
            new SetUserDefinedPropertyAction(`${controlState.id}.${controlState.value.length}`, 'id', uuidv4())
          );

          if (controlState.isSubmitted) {
            this.controlStateActionTriggered.next(new MarkAsSubmittedAction(controlState.id));
          }
        })
      )
    );
  }

  private registerRemoveItemEffect(): void {
    this.removeItemEffect$ = this.componentStore.effect((origin$: Observable<number>) =>
      origin$.pipe(
        withLatestFrom(
          this.controlState$
        ),
        tap(([id, controlState]) => this.controlStateActionTriggered.next(
            new RemoveArrayControlAction(controlState.id, id)
          )
        )
      )
    );
  }
}
