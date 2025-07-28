import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'account-reports-page',
    templateUrl: 'reports.html',
    styleUrls: ['reports.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountReportsPageComponent {}
