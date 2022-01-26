import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Inject } from '@angular/core';
import { AccountDialogEditUserComponentFacade } from './dialog-edit-user.facade';
import { Observable } from 'rxjs';
import { Actions, FormGroupState } from 'ngrx-forms';
import { AccountDialogEditUserForm } from './forms';
import { ComponentStore } from '@ngrx/component-store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@shared/user';

@Component({
  selector: 'account-dialog-edit-user',
  templateUrl: 'dialog-edit-user.html',
  styleUrls: ['dialog-edit-user.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AccountDialogEditUserComponentFacade,
    ComponentStore
  ]
})
export class AccountDialogEditUserComponent implements OnInit, OnDestroy {
  public isEditMode$: Observable<boolean>;
  public isSendingRequest$: Observable<boolean>;
  public user$: Observable<User>;
  public formState$: Observable<FormGroupState<AccountDialogEditUserForm>>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { isEditMode: boolean, user: User },
    private readonly facade: AccountDialogEditUserComponentFacade
  ) {
    this.isEditMode$ = this.facade.isEditMode$;
    this.isSendingRequest$ = this.facade.isSendingRequest$;
    this.user$ = this.facade.user$;
    this.formState$ = this.facade.formState$;
  }

  public ngOnInit(): void {
    this.facade.setIsEditMode(this.data?.isEditMode);
    this.facade.initComponent(this.data?.user);
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public formSubmitted(): void {
    this.facade.saveChanges();
  }

  public formActionTriggered(action: Actions<any>): void {
    this.facade.handleFormStateAction(action);
  }
}
