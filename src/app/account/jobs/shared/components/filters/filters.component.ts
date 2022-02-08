import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountJobsPageFacade } from '@app/account/jobs/jobs.facade';
import { Customer } from '@shared/customer';
import { FilterValue } from '@shared/filter-values';
import { Site } from '@shared/site';
import { Actions, FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { AccountJobsFilterForm } from '../../forms';

@Component({
  selector: 'account-jobs-filters',
  templateUrl: 'filters.html',
  styleUrls: ['filters.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountJobsFiltersComponent {
  public filterFormState$: Observable<FormGroupState<AccountJobsFilterForm>>;
  public filterValues$: Observable<Array<FilterValue>>;
  public getStartAppointmentDateFilter$: Observable<(date: Date) => boolean>;
  public getEndAppointmentDateFilter$: Observable<(date: Date) => boolean>;

  constructor(
    private facade: AccountJobsPageFacade
  ) {
    this.filterFormState$ = this.facade.filterFormState$;
    this.filterValues$ = this.facade.filterValues$;
    this.getStartAppointmentDateFilter$ = this.facade.getStartAppointmentDateFilter$();
    this.getEndAppointmentDateFilter$ = this.facade.getEndAppointmentDateFilter$();
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

  public selectedSiteChanged(site: Site): void {
    this.facade.setSelectedSite(site);
  }
}
