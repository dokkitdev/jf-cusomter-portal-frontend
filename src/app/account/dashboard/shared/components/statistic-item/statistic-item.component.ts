import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Params } from '@angular/router';

@Component({
  selector: 'dashboard-statistic-item',
  templateUrl: 'statistic-item.html',
  styleUrls: ['statistic-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountDashboardStatisticItemComponent {
  @Input() name: string;
  @Input() value: number;
  @Input() route: string;
  @Input() queryParams: Params;
}
