import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountJobsPageFacade } from '@app/account/jobs/jobs.facade';
import { Job } from '@shared/job';
import { Observable } from 'rxjs';
import { heightCollapseAnimation } from '@shared/animations';

@Component({
  selector: 'account-jobs-items',
  templateUrl: 'items.html',
  styleUrls: ['items.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightCollapseAnimation]
})
export class AccountJobsItemsComponent {
  public items$: Observable<Array<Job>>;
  public hasMoreItems$: Observable<boolean>;
  public isLoading$: Observable<boolean>;
  public isLoadingToPage$: Observable<boolean>;

  constructor(
    private facade: AccountJobsPageFacade
  ) {
    this.items$ = this.facade.items$;
    this.hasMoreItems$ = this.facade.hasMoreItems$;
    this.isLoading$ = this.facade.isLoading$;
    this.isLoadingToPage$ = this.facade.isLoadingToPage$;
  }

  public loadNextPageClicked(): void {
    this.facade.loadNextPage();
  }
}
