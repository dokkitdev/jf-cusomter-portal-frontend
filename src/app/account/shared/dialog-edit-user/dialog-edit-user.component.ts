import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountDialogEditUserComponentFacade } from './dialog-edit-user.facade';
import { ComponentStore } from '@ngrx/component-store';

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
export class AccountDialogEditUserComponent {}
