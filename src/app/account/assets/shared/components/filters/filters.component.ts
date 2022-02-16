import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountAssetsPageFacade } from '@app/account/assets/assets.facade';
import { Customer } from '@shared/customer';
import { FilterValue } from '@shared/filter-values';
import { Actions, FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { AccountAssetsFilterForm } from '../../forms';

@Component({
  selector: 'assets-filters',
  templateUrl: 'filters.html',
  styleUrls: ['filters.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAssetsFiltersComponent {
  public filterFormState$: Observable<FormGroupState<AccountAssetsFilterForm>>;
  public filterValues$: Observable<Array<FilterValue>>;
  public getStartLastTestDateFilter$: Observable<(date: Date) => boolean>;
  public getEndLastTestDateFilter$: Observable<(date: Date) => boolean>;
  public getStartNextServiceDateFilter$: Observable<(date: Date) => boolean>;
  public getEndNextServiceDateFilter$: Observable<(date: Date) => boolean>;

  constructor(
    private facade: AccountAssetsPageFacade
  ) {
    this.filterFormState$ = this.facade.filterFormState$;
    this.filterValues$ = this.facade.filterValues$;
    this.getStartLastTestDateFilter$ = this.facade.getStartLastTestDateFilter$();
    this.getEndLastTestDateFilter$ = this.facade.getEndLastTestDateFilter$();
    this.getStartNextServiceDateFilter$ = this.facade.getStartNextServiceDateFilter$();
    this.getEndNextServiceDateFilter$ = this.facade.getEndNextServiceDateFilter$();
  }

  public formActionTriggered(action: Actions<any>): void {
    this.facade.handleFormStateAction(action);
  }

  public removeFilterClicked(item: FilterValue): void {
    this.facade.removeFilter(item);
  }

  public selectedCustomerChanged(customer: Customer): void {
    this.facade.setSelectedCustomer(customer);
  }
}
