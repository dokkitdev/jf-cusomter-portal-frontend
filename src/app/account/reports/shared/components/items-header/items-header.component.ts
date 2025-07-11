import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReportSortField } from '@shared/report';
import { Observable } from 'rxjs';
import { AccountReportsPageFacade } from '@app/account/reports/reports.facade';
import { AccountReportsQueryParameters } from '@app/account/reports/shared/models';

@Component({
  selector: 'reports-items-header',
  templateUrl: 'items-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountReportsItemsHeaderComponent {
  public parameters$: Observable<AccountReportsQueryParameters>;
  public sortField: typeof ReportSortField;

  constructor(
    private facade: AccountReportsPageFacade
  ) {
    this.parameters$ = this.facade.parameters$;
    this.sortField = ReportSortField;
  }

  public sortChanged(parameters: AccountReportsQueryParameters): void {
    this.facade.changeSort(parameters);
  }
}
