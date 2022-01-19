import { AccountAdminUsersPageFacade } from './../../../users.facade';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'admin-users-header',
  templateUrl: 'header.html',
  styleUrls: ['header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAdminUsersHeaderComponent {
  constructor(
    private facade: AccountAdminUsersPageFacade
  ) { }

  public newUserButtonClicked(): void {
    this.facade.createItem();
  }
}
