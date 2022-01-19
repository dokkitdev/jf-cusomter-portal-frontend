import { DialogService } from '@shared/dialog';
import { UserService } from './../../../shared/user/user.service';
import { AppState } from './../../../shared/store/state';
import { ComponentStore } from '@ngrx/component-store';
import { AccountAdminUsersPageState } from './users.state';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

@Injectable()
export class AccountAdminUsersPageFacade {
  constructor(
    private readonly componentStore: ComponentStore<AccountAdminUsersPageState>,
    private readonly store: Store<AppState>,
    private readonly actions$: Actions,
    private readonly userService: UserService,
    private readonly dialogService: DialogService
  ) {
    this.resetState();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountAdminUsersPageState());
  }
}
