import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AccountJobsPageFacade } from './jobs.facade';

@Component({
  selector: 'account-jobs-page',
  templateUrl: 'jobs.html',
  styleUrls: ['jobs.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountJobsPageComponent implements OnInit, OnDestroy {
  constructor(
    private facade: AccountJobsPageFacade
  ) { }

  public ngOnInit(): void {
    this.facade.loadItems();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
