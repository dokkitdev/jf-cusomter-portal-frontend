import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dashboard-statistic',
  templateUrl: 'statistic.html',
  styleUrls: ['statistic.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountDashboardStatisticComponent {}
