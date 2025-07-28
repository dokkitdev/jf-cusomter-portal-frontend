import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'dashboard-statistic-link',
    templateUrl: 'statistic-link.html',
    styleUrls: ['statistic-link.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountDashboardStatisticLinkComponent {
  @Input() name: string;
  @Input() route: string;
}
