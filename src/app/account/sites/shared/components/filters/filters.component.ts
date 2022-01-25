import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountSitesPageFacade } from '@app/account/sites/sites.facade';
import { Customer } from '@shared/customer';
import { FilterValue } from '@shared/filter-values';
import { Actions, FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { AccountSitesFilterForm } from '../../forms';

@Component({
  selector: 'account-sites-filters',
  templateUrl: 'filters.html',
  styleUrls: ['filters.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSitesFiltersComponent {
  public filterFormState$: Observable<FormGroupState<AccountSitesFilterForm>>;
  public filterValues$: Observable<Array<FilterValue>>;

  constructor(
    private facade: AccountSitesPageFacade
  ) {
    this.filterFormState$ = this.facade.filterFormState$;
    this.filterValues$ = this.facade.filterValues$;
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
