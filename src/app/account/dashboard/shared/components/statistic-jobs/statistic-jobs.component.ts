import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DashboardStatistic } from '@shared/dashboard';
import { JobStage } from '@shared/job';

@Component({
  selector: 'dashboard-statistic-jobs',
  templateUrl: 'statistic-jobs.html',
  styleUrls: ['statistic-jobs.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountDashboardStatisticJobsComponent {
  @Input() statistic: DashboardStatistic;

  public jobStage: typeof JobStage;

  constructor() {
    this.jobStage = JobStage;
  }
}
