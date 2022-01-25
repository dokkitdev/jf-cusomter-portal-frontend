import { AccountAdminUsersPageFacade } from './../../../users.facade';
import { UserSortField } from './../../../../../../shared/user/enums/sort-field';
import { Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountAdminUsersQueryParameters } from '../../models';

@Component({
  selector: 'admin-users-items-header',
  templateUrl: 'items-header.html',
  styleUrls: ['items-header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAdminUsersItemsHeaderComponent {
  public parameters$: Observable<AccountAdminUsersQueryParameters>;
  public userSortField: typeof UserSortField;

  constructor(
    private facade: AccountAdminUsersPageFacade
  ) {
    this.parameters$ = this.facade.parameters$;
    this.userSortField = UserSortField;
  }

  public sortChanged(parameters: AccountAdminUsersQueryParameters): void {
    this.facade.changeSort(parameters);
  }
}
