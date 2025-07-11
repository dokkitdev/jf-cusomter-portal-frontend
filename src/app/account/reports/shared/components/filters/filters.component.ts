import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountReportsPageFacade } from '@app/account/reports/reports.facade';
import { FilterValue } from '@shared/filter-values';
import { Actions, FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { AccountReportsFilterForm } from '@app/account/reports/shared/forms';

@Component({
  selector: 'reports-filters',
  templateUrl: 'filters.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountReportsFiltersComponent {
  public filterFormState$: Observable<FormGroupState<AccountReportsFilterForm>>;
  public filterValues$: Observable<Array<FilterValue>>;

  constructor(
    private facade: AccountReportsPageFacade
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
}
