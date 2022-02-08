import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AccountCostCenterMultiselectComponentState } from './cost-center-multiselect.state';
import { Observable, Subject } from 'rxjs';
import { CustomSelectOption } from '@shared/custom-select/models';
import { map, switchMap } from 'rxjs/operators';
import { Actions } from 'ngrx-forms';
import { JobCostCenter, JobService } from '@shared/job';

@Injectable()
export class AccountCostCenterMultiselectComponentFacade {
  public get items$(): Observable<Array<JobCostCenter>> {
    return this.componentStore.select((state) => state.items);
  }

  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get options$(): Observable<Array<CustomSelectOption<string>>> {
    return this.items$.pipe(
      map((items) => items.map((item) =>
        new CustomSelectOption({
          id: item.name,
          title: item.name
        }))
      )
    );
  }

  public controlStateActionTriggered: Subject<Actions<any>>;

  private loadItemsEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountCostCenterMultiselectComponentState>,
    private readonly jobService: JobService
  ) {
    this.controlStateActionTriggered = new Subject();

    this.resetState();
    this.registerLoadItemsEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountCostCenterMultiselectComponentState());
  }

  public loadItems(): void {
    this.loadItemsEffect$();
  }

  private updateStateItems(items: Array<JobCostCenter> = []): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items
      })
    )();
  }

  private updateIsLoading(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isLoading: value
      })
    )();
  }

  private registerLoadItemsEffect(): void {
    this.loadItemsEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        switchMap(() => {
          this.updateIsLoading(true);

          return this.jobService
            .getCostCenters()
            .pipe(
              tapResponse(
                (items) => {
                  this.updateIsLoading(false);
                  this.updateStateItems(items);
                },
                () => this.updateIsLoading(false)
              )
            );
        })
      )
    );
  }
}
