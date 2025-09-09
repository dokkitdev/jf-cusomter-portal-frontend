import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountReportsGeneralPageFacade } from '../../../general.facade';
import { AccountReportsGeneralQueryParameters } from '../../types/query-parameters';
import { GeneralReportsSortField } from '../../types/general-reports-sort-field';

@Component({
  selector: 'reports-general-table-header',
  templateUrl: 'table-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountReportsGeneralTableHeaderComponent {
  public parameters$: Observable<AccountReportsGeneralQueryParameters>;
  public generalReportsSortField: typeof GeneralReportsSortField;

  constructor(private facade: AccountReportsGeneralPageFacade) {
    this.parameters$ = this.facade.parameters$;
    this.generalReportsSortField = GeneralReportsSortField;
  }

  public sortChanged(parameters: AccountReportsGeneralQueryParameters): void {
    this.facade.changeSort(parameters);
  }
}
