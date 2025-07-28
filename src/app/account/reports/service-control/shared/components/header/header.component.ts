import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'reports-service-control-header',
    templateUrl: 'header.html',
    styleUrls: ['header.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountReportsServiceControlHeaderComponent { }
