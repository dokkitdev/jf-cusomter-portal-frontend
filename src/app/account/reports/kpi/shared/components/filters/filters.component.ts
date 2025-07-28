import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountReportsKPIPageFacade } from '../../../kpi.facade';
import { FilterValue } from '@shared/filter-values';
import { Actions, FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { AccountReportsKPIFilterForm } from '../../forms';

@Component({
    selector: 'reports-kpi-filters',
    templateUrl: 'filters.html',
    styleUrls: ['filters.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountReportsKPIFiltersComponent {
  public filterFormState$: Observable<FormGroupState<AccountReportsKPIFilterForm>>;
  public filterValues$: Observable<Array<FilterValue>>;
  public getStartCreatedDateFilter$: Observable<(date: Date) => boolean>;
  public getEndCreatedDateFilter$: Observable<(date: Date) => boolean>;

  constructor(
    private facade: AccountReportsKPIPageFacade
  ) {
    this.filterFormState$ = this.facade.filterFormState$;
    this.filterValues$ = this.facade.filterValues$;
    this.getStartCreatedDateFilter$ = this.facade.getStartCreatedDateFilter$();
    this.getEndCreatedDateFilter$ = this.facade.getEndCreatedDateFilter$();
  }

  public formActionTriggered(action: Actions<any>): void {
    this.facade.handleFormStateAction(action);
  }

  public removeFilterClicked(item: FilterValue): void {
    this.facade.removeFilter(item);
  }
}
