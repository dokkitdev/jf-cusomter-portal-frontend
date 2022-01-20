import { AccountAdminUsersPageFacade } from './users.facade';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'account-admin-users-page',
  templateUrl: 'users.html',
  styleUrls: ['users.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAdminUsersPageComponent implements OnInit, OnDestroy {
  constructor(
    private facade: AccountAdminUsersPageFacade
  ) { }

  public ngOnInit(): void {
    // this.facade.loadItems();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
