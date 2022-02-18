import { Component, ChangeDetectionStrategy } from '@angular/core';
import { JobSortField } from '@shared/job';
import { Observable } from 'rxjs';
import { AccountReportsKPIPageFacade } from '../../../kpi.facade';
import { AccountReportsKPIQueryParameters } from '../../models';

@Component({
  selector: 'reports-kpi-items-header',
  templateUrl: 'items-header.html',
  styleUrls: ['items-header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountReportsKPIItemsHeaderComponent {
  public parameters$: Observable<AccountReportsKPIQueryParameters>;
  public jobSortField: typeof JobSortField;

  constructor(
    private facade: AccountReportsKPIPageFacade
  ) {
    this.parameters$ = this.facade.parameters$;
    this.jobSortField = JobSortField;
  }

  public sortChanged(parameters: AccountReportsKPIQueryParameters): void {
    this.facade.changeSort(parameters);
  }
}
