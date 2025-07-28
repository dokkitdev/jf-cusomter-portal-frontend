import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/operators';
import { CustomSelectOption } from '@shared/custom-select';
import { xor } from 'lodash';
import {
  SetValueAction,
  Actions,
  FormControlState,
  FormControlValueTypes,
  Boxed,
  unbox,
  box
} from 'ngrx-forms';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CustomMultiselectComponentState } from './custom-multiselect.state';

@Injectable()
export class CustomMultiselectFacade<T extends FormControlValueTypes> {
  public get controlState$(): Observable<FormControlState<Boxed<Array<T>>>> {
    return this.componentStore.select((state) => state.controlState);
  }

  public get isDisabled$(): Observable<boolean> {
    return this.componentStore.select((state) => state.controlState.isDisabled);
  }

  public get options$(): Observable<Array<CustomSelectOption<T>>> {
    return this.componentStore.select((state) => state.options);
  }

  public controlStateActionTriggered: Subject<Actions<any>>;
  public filterChanged: Subject<string>;

  private changeOptionEffect$: (optionValue: T) => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<CustomMultiselectComponentState<T>>
  ) {
    this.controlStateActionTriggered = new Subject();
    this.filterChanged = new Subject();

    this.resetState();
    this.registerChangeOptionEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new CustomMultiselectComponentState());
  }

  public changeOption(optionValue: T): void {
    this.changeOptionEffect$(optionValue);
  }

  public setControlState(controlState: FormControlState<Boxed<Array<T>>>): void {
    this.updateControlState(controlState);
  }

  public setOptions(options: Array<CustomSelectOption<T>>): void {
    this.updateOptions(options);
  }

  public getIsSelected$(id: T): Observable<boolean> {
    return this
      .controlState$
      .pipe(
        map((controlState) => unbox(controlState.value).includes(id))
      );
  }

  private updateControlState(controlState: FormControlState<Boxed<Array<T>>>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        controlState
      })
    )();
  }

  private updateOptions(options: Array<CustomSelectOption<T>>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        options
      })
    )();
  }

  private registerChangeOptionEffect(): void {
    this.changeOptionEffect$ = this.componentStore.effect((origin$: Observable<T>) =>
      origin$.pipe(
        concatLatestFrom(() => this.controlState$),
        tap(([optionValue, controlState]) => {
          const value = unbox(controlState.value);
          const options = xor(value, [optionValue]);

          this.controlStateActionTriggered.next(
            new SetValueAction(controlState.id, box(options))
          );
        })
      )
    );
  }
}
