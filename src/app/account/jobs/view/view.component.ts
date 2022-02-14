import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AccountJobsViewPageFacade } from './view.facade';
import { Observable } from 'rxjs';
import { Job } from '@shared/job';
import { SpinnerDiameter } from '@shared/loading-spinner';

@Component({
  selector: 'account-jobs-view-page',
  templateUrl: 'view.html',
  styleUrls: ['view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountJobsViewPageComponent implements OnInit, OnDestroy {
  public isLoading$: Observable<boolean>;
  public job$: Observable<Job>;
  public spinnerDiameter: typeof SpinnerDiameter;

  constructor(
    private facade: AccountJobsViewPageFacade
  ) {
    this.isLoading$ = this.facade.isLoading$;
    this.job$ = this.facade.job$;
    this.spinnerDiameter = SpinnerDiameter;
  }

  public ngOnInit(): void {
    this.facade.initPage();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public backClicked(): void {
    this.facade.back();
  }
}
