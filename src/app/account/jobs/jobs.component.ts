import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountJobsPageFacade } from './jobs.facade';

@Component({
    selector: 'account-jobs-page',
    templateUrl: 'jobs.html',
    styleUrls: ['jobs.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountJobsPageComponent implements OnInit, OnDestroy {
  public isExporting$: Observable<boolean>;

  constructor(
    private facade: AccountJobsPageFacade
  ) {
    this.isExporting$ = this.facade.isExporting$;
  }

  public ngOnInit(): void {
    this.facade.loadItems();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public exportClicked(): void {
    this.facade.exportCSV();
  }
}
