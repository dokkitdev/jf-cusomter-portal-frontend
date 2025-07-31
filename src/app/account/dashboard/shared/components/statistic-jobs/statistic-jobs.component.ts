import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AccountDashboardPageFacade } from '../../../dashboard.facade';
import { DashboardStatistic } from '@shared/dashboard';
import { JobStage } from '@shared/job';

@Component({
  selector: 'dashboard-statistic-jobs',
  templateUrl: 'statistic-jobs.html',
  styleUrls: ['statistic-jobs.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountDashboardStatisticJobsComponent {
  @Input() statistic: DashboardStatistic;

  public jobStage: typeof JobStage;
  public todayDate: string;

  constructor(private facade: AccountDashboardPageFacade) {
    this.jobStage = JobStage;
    this.todayDate = this.facade.todayDate;
  }
}
