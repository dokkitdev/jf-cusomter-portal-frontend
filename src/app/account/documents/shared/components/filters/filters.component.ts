import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountDocumentsPageFacade } from '@app/account/documents/documents.facade';
import { FilterValue } from '@shared/filter-values';
import { Actions, FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { AccountDocumentsFilterForm } from '../../forms';

@Component({
  selector: 'documents-filters',
  templateUrl: 'filters.html',
  styleUrls: ['filters.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountDocumentsFiltersComponent {
  public filterFormState$: Observable<FormGroupState<AccountDocumentsFilterForm>>;
  public filterValues$: Observable<Array<FilterValue>>;
  public getStartCreatedAtFilter$: Observable<(date: Date) => boolean>;
  public getEndCreatedAtFilter$: Observable<(date: Date) => boolean>;

  constructor(
    private facade: AccountDocumentsPageFacade
  ) {
    this.filterFormState$ = this.facade.filterFormState$;
    this.filterValues$ = this.facade.filterValues$;
    this.getStartCreatedAtFilter$ = this.facade.getStartCreatedAtFilter$();
    this.getEndCreatedAtFilter$ = this.facade.getEndCreatedAtFilter$();
  }

  public formActionTriggered(action: Actions<any>): void {
    this.facade.handleFormStateAction(action);
  }

  public removeFilterClicked(item: FilterValue): void {
    this.facade.removeFilter(item);
  }
}
