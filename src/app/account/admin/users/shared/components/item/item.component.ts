import { ComponentStore } from '@ngrx/component-store';
import { SpinnerDiameter } from '@shared/loading-spinner';
import { Subject, Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { User } from '@shared/user';
import { AccountAdminUsersItemComponentFacade } from './item.facade';
import { configuration } from '@configurations';

@Component({
    selector: 'admin-users-item',
    templateUrl: 'item.html',
    styleUrls: ['item.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        AccountAdminUsersItemComponentFacade,
        ComponentStore
    ],
    standalone: false
})
export class AccountAdminUsersItemComponent {
  @Input() item: User;

  @Output() deletingSuccess: Subject<number>;

  public isSendingRequest$: Observable<boolean>;
  public spinnerDiameter: typeof SpinnerDiameter;
  public dateFormat: string;

  constructor(
    private facade: AccountAdminUsersItemComponentFacade
  ) {
    this.deletingSuccess = this.facade.deletingSuccessSubject;
    this.isSendingRequest$ = this.facade.isSendingRequest$;
    this.spinnerDiameter = SpinnerDiameter;
    this.dateFormat = configuration.dateFormats.lastLoginDate;
  }

  public deleteButtonClicked(): void {
    this.facade.deleteItem(this.item.id);
  }

  public editButtonClicked(): void {
    this.facade.editItem(this.item);
  }

  public resendInvitationEmailButtonClicked(): void {
    this.facade.resendInvitationEmail(this.item);
  }
}
