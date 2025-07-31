import { Component, ChangeDetectionStrategy } from '@angular/core';
import { JobSortField } from '@shared/job';
import { Observable } from 'rxjs';
import { AccountJobsPageFacade } from '../../../jobs.facade';
import { AccountJobsQueryParameters } from '../../models';

@Component({
  selector: 'jobs-items-header',
  templateUrl: 'items-header.html',
  styleUrls: ['items-header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountJobsItemsHeaderComponent {
  public parameters$: Observable<AccountJobsQueryParameters>;
  public jobSortField: typeof JobSortField;

  constructor(private facade: AccountJobsPageFacade) {
    this.parameters$ = this.facade.parameters$;
    this.jobSortField = JobSortField;
  }

  public sortChanged(parameters: AccountJobsQueryParameters): void {
    this.facade.changeSort(parameters);
  }
}
