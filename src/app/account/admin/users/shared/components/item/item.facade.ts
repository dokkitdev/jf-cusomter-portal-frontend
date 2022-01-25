import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from '@shared/dialog';
import { DialogConfirmationComponent } from '@shared/dialog-confirmation';
import { User, UserService } from '@shared/user';
import { NotificationService } from '@shared/notification';
import { EMPTY, Observable, Subject } from 'rxjs';
import { exhaustMap, map, switchMap } from 'rxjs/operators';
import { AccountAdminUsersItemComponentState } from './item.state';
import { AccountDialogEditUserComponent } from '@app/account/shared/dialog-edit-user';

@Injectable()
export class AccountAdminUsersItemComponentFacade {
  public get isSendingRequest$(): Observable<boolean> {
    return this.componentStore.select((store) => store.isSendingRequest);
  }

  public deletingSuccessSubject: Subject<number> = new Subject();

  private openEditUserDialogEffect$: (item: User) => Observable<void>;
  private resendInvitationEmailEffect$: (item: User) => Observable<void>;
  private deleteItemEffect$: (id: number) => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountAdminUsersItemComponentState>,
    private readonly userService: UserService,
    private readonly dialogService: DialogService,
    private readonly translateService: TranslateService,
    private readonly notificationService: NotificationService
  ) {
    this.resetState();

    this.registerOpenEditUserDialogEffect();
    this.registerResendInvitationEmailEffect();
    this.registerDeleteItemEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountAdminUsersItemComponentState());
  }

  public deleteItem(id: number): void {
    this.deleteItemEffect$(id);
  }

  public editItem(item: User): void {
    this.openEditUserDialogEffect$(item);
  }

  public resendInvitationEmail(item: User): void {
    this.resendInvitationEmailEffect$(item);
  }

  private updateIsSendingRequest(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isSendingRequest: value
      })
    )();
  }

  private registerOpenEditUserDialogEffect(): void {
    this.openEditUserDialogEffect$ = this.componentStore.effect((origin$: Observable<User>) =>
      origin$.pipe(
        map((user) => this.dialogService.open(AccountDialogEditUserComponent, {
          autoFocus: false,
          data: { isEditMode: true, user }
        }))
      )
    );
  }

  private registerResendInvitationEmailEffect(): void {
    this.resendInvitationEmailEffect$ = this.componentStore.effect((origin$: Observable<User>) =>
      origin$.pipe(
        exhaustMap((user) => {
          this.updateIsSendingRequest(true);

          return this.userService
            .resendInvitation(user.id)
            .pipe(
              tapResponse(
                () => {
                  this.updateIsSendingRequest(false);

                  this.notificationService.success(
                    this.translateService.instant('ACCOUNT.ADMIN.USERS.NOTIFICATIONS.TEXT_INVITATION_RESENT')
                  );
                },
                () => {
                  this.updateIsSendingRequest(false);

                  this.notificationService.error(
                    this.translateService.instant('ACCOUNT.ADMIN.USERS.NOTIFICATIONS.TEXT_ERROR')
                  );
                }
              )
            );
        })
      )
    );
  }

  private registerDeleteItemEffect(): void {
    this.deleteItemEffect$ = this.componentStore.effect((origin$: Observable<number>) =>
      origin$.pipe(
        map((id) => this.dialogService.open(DialogConfirmationComponent, {
          data: {
            title: this.translateService.instant('ACCOUNT.ADMIN.USERS.DIALOG_DELETE_ITEM.TEXT_TITLE'),
            text: this.translateService.instant('ACCOUNT.ADMIN.USERS.DIALOG_DELETE_ITEM.TEXT_MESSAGE'),
            cancelButtonText: this.translateService.instant('ACCOUNT.ADMIN.USERS.DIALOG_DELETE_ITEM.BUTTON_CANCEL'),
            confirmButtonText: this.translateService.instant('ACCOUNT.ADMIN.USERS.DIALOG_DELETE_ITEM.BUTTON_CONFIRM'),
            resultData: id
          }
        })),
        switchMap((dialogRef) => dialogRef.afterClosed()),
        exhaustMap((result) => {
          if (result) {
            this.updateIsSendingRequest(true);

            return this.tryToDeleteUser(result);
          }

          return EMPTY;
        })
      )
    );
  }

  private tryToDeleteUser(id: number): Observable<void> {
    return this.userService
      .delete(id)
      .pipe(
        tapResponse(
          () => {
            this.updateIsSendingRequest(false);

            this.deletingSuccessSubject.next(id);

            this.notificationService.success(
              this.translateService.instant('ACCOUNT.ADMIN.USERS.NOTIFICATIONS.TEXT_USER_DELETED')
            );
          },
          () => {
            this.updateIsSendingRequest(false);

            this.notificationService.error(
              this.translateService.instant('ACCOUNT.ADMIN.USERS.NOTIFICATIONS.TEXT_ERROR')
            );
          }
        )
      );
  }
}
