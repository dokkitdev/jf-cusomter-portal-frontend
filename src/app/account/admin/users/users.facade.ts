import { AccountDialogEditUserComponent } from './../../shared/dialog-edit-user/dialog-edit-user.component';
import { map, Observable } from 'rxjs';
import { DialogService } from '@shared/dialog';
import { ComponentStore } from '@ngrx/component-store';
import { AccountAdminUsersPageState } from './users.state';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountAdminUsersPageFacade {
  private openCreateUserDialogEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountAdminUsersPageState>,
    private readonly dialogService: DialogService
  ) {
    this.resetState();

    this.registerOpenCreateUserDialogEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountAdminUsersPageState());
  }

  public createItem(): void {
    this.openCreateUserDialogEffect$();
  }

  private registerOpenCreateUserDialogEffect(): void {
    this.openCreateUserDialogEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        map(() => this.dialogService.open(AccountDialogEditUserComponent, {
          autoFocus: false
        }))
      )
    );
  }
}
