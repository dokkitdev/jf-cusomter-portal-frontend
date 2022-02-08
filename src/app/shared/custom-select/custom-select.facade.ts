import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import {
  SetValueAction,
  MarkAsDirtyAction,
  Actions,
  FormControlState,
  FormControlValueTypes,
  formStateReducer
} from 'ngrx-forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, skip, tap } from 'rxjs/operators';
import { CustomSelectComponentState } from './custom-select.state';
import { CustomSelectOption } from './models';

@Injectable()
export class CustomSelectFacade<T extends FormControlValueTypes> {
  public get controlState$(): Observable<FormControlState<T>> {
    return this.componentStore.select((state) => state.controlState);
  }

  public get filterControlState$(): Observable<FormControlState<string>> {
    return this.componentStore.select((state) => state.filterControlState);
  }

  public get filterQuery$(): Observable<string> {
    return this.componentStore.select((state) => state.filterControlState.value);
  }

  public get isDisabled$(): Observable<boolean> {
    return this.componentStore.select((state) => state.controlState.isDisabled);
  }

  public get options$(): Observable<Array<CustomSelectOption<T>>> {
    return this.componentStore.select((state) => state.options);
  }

  public get selectedOption$(): Observable<CustomSelectOption<T> | undefined> {
    return this.componentStore.select((state) => state.selectedOption);
  }

  public controlStateActionTriggered: Subject<Actions<any>>;
  public selectedOptionChanged: Subject<CustomSelectOption<T> | undefined>;
  public filterChanged: Subject<string>;

  private changeOptionEffect$: (optionValue: T) => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<CustomSelectComponentState<T>>
  ) {
    this.controlStateActionTriggered = new Subject();
    this.selectedOptionChanged = new Subject();
    this.filterChanged = new Subject();

    this.resetState();
    this.registerHandleFilterChangesEffect();
    this.registerSetSelectedOptionEffect();
    this.registerChangeOptionEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new CustomSelectComponentState());
  }

  public changeOption(optionValue: T): void {
    this.changeOptionEffect$(optionValue);
  }

  public handleFilterStateAction(action: Actions<any>): void {
    this.updateFilterState(action);
  }

  public setControlState(controlState: FormControlState<T>): void {
    this.updateControlState(controlState);
  }

  public setOptions(options: Array<CustomSelectOption<T>>): void {
    this.updateOptions(options);
  }

  private updateControlState(controlState: FormControlState<T>): void {
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

  private updateSelectedOption(option: CustomSelectOption<T> | undefined): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        selectedOption: option
      })
    )();
  }

  private updateFilterState(action: Actions<any>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        filterControlState: formStateReducer(state.filterControlState, action)
      })
    )();
  }

  private registerChangeOptionEffect(): void {
    this.changeOptionEffect$ = this.componentStore.effect((origin$: Observable<T>) =>
      origin$.pipe(
        concatLatestFrom(() => this.controlState$),
        tap(([optionValue, controlState]) => {
          this.controlStateActionTriggered.next(
            new SetValueAction(controlState.id, optionValue)
          );

          if (controlState.isPristine) {
            this.controlStateActionTriggered.next(
              new MarkAsDirtyAction(controlState.id)
            );
          }
        })
      )
    );
  }

  private registerHandleFilterChangesEffect(): void {
    this.componentStore.effect(() =>
      this
        .filterQuery$
        .pipe(
          skip(1),
          debounceTime(300),
          distinctUntilChanged(),
          tap((query) => this.filterChanged.next(query))
        )
    );
  }

  private registerSetSelectedOptionEffect(): void {
    this.componentStore.effect(() =>
      combineLatest([
        this.controlState$,
        this.options$
      ])
      .pipe(
        tap(([controlState, options]) => {
          const selectedOption = options.find((option) => option.id === controlState.value);

          if (selectedOption || controlState.value === undefined) {
            this.selectedOptionChanged.next(selectedOption);
            this.updateSelectedOption(selectedOption);
          }
        })
      )
    );
  }
}
