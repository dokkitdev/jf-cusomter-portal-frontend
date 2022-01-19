import { AccountAdminUsersFilterForm } from './../../forms';
import { Observable } from 'rxjs';
import { Customer } from '@shared/customer';
import { AccountAdminUsersPageFacade } from './../../../users.facade';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Actions, FormGroupState } from 'ngrx-forms';
import { FilterValue } from '@shared/filter-values';

@Component({
  selector: 'admin-users-filters',
  templateUrl: 'filters.html',
  styleUrls: ['filters.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAdminUsersFiltersComponent {
  public filterFormState$: Observable<FormGroupState<AccountAdminUsersFilterForm>>;
  public filterValues$: Observable<Array<FilterValue>>;

  constructor(
    private facade: AccountAdminUsersPageFacade
  ) {
    this.filterFormState$ = this.facade.filterFormState$;
    this.filterValues$ = this.facade.filterValues$;
  }

  public formActionTriggered(action: Actions<any>): void {
    // this.facade.handleFormStateAction(action);
  }

  public removeFilterClicked(item: FilterValue): void {
    // this.facade.removeFilter(item);
  }

  public selectedCustomerChanged(customer: Customer): void {
    // this.facade.setSelectedCustomer(customer);
  }
}
