import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'account-admin-page',
    templateUrl: 'admin.html',
    styleUrls: ['admin.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountAdminPageComponent {}
