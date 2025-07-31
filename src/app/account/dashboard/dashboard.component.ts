import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AccountDashboardPageFacade } from './dashboard.facade';
import { Observable } from 'rxjs';
import { DashboardStatistic } from '@shared/dashboard';
import { SpinnerDiameter } from '@shared/loading-spinner';

@Component({
  selector: 'dashboard-page',
  templateUrl: 'dashboard.html',
  styleUrls: ['dashboard.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountDashboardPageComponent implements OnInit, OnDestroy {
  public isLoading$: Observable<boolean>;
  public dashboardStatistic$: Observable<DashboardStatistic>;
  public spinnerDiameter: typeof SpinnerDiameter;

  constructor(private facade: AccountDashboardPageFacade) {
    this.isLoading$ = this.facade.isLoading$;
    this.dashboardStatistic$ = this.facade.dashboardStatistic$;
    this.spinnerDiameter = SpinnerDiameter;
  }

  public ngOnInit(): void {
    this.facade.loadDashboardStatistic();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
