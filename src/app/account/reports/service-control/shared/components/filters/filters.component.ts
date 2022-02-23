import { AccountReportsServiceControlFacade } from './../../../service-control.facade';
import { Actions, FormGroupState } from 'ngrx-forms';
import { FilterValue } from '@shared/filter-values';
import { Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountReportsServiceControlFilterForm } from '../../forms';
import { Site } from '@shared/site';

@Component({
  selector: 'reports-service-control-filters',
  templateUrl: 'filters.html',
  styleUrls: ['filters.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountReportsServiceControlFiltersComponent {
  public filterFormState$: Observable<FormGroupState<AccountReportsServiceControlFilterForm>>;
  public filterValues$: Observable<Array<FilterValue>>;

  constructor(
    private facade: AccountReportsServiceControlFacade
  ) {
    this.filterFormState$ = this.facade.filterFormState$;
    this.filterValues$ = this.facade.filterValues$;
  }

  public formActionTriggered(action: Actions<any>): void {
    this.facade.handleFormStateAction(action);
  }

  public selectedSiteChanged(site: Site): void {
    this.facade.setSelectedSite(site);
  }

  public removeFilterClicked(item: FilterValue): void {
    this.facade.removeFilter(item);
  }
}
