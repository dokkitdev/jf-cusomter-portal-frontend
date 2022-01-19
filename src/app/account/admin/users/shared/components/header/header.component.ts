import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'admin-users-header',
  templateUrl: 'header.html',
  styleUrls: ['header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAdminUsersHeaderComponent { }
