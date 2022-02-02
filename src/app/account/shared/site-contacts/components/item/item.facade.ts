import { Injectable } from '@angular/core';
import { AccountDialogEditContactComponent } from '@app/account/shared/dialog-edit-contact';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from '@shared/dialog';
import { DialogConfirmationComponent } from '@shared/dialog-confirmation';
import { Contact, ContactService } from '@shared/contact';
import { EMPTY, Observable, Subject } from 'rxjs';
import { exhaustMap, map, switchMap } from 'rxjs/operators';
import { AccountSiteContactsItemComponentState } from './item.state';
import { NotificationService } from '@shared/notification';

@Injectable()
export class AccountSiteContactsItemComponentFacade {
  public get isSendingRequest$(): Observable<boolean> {
    return this.componentStore.select((store) => store.isSendingRequest);
  }

  public deletingSuccessSubject: Subject<number> = new Subject();

  private openEditContactDialogEffect$: (item: Contact) => Observable<void>;
  private deleteItemEffect$: (id: number) => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountSiteContactsItemComponentState>,
    private readonly contactService: ContactService,
    private readonly dialogService: DialogService,
    private readonly translateService: TranslateService,
    private readonly notificationService: NotificationService
  ) {
    this.resetState();

    this.registerOpenEditContactDialogEffect();
    this.registerDeleteItemEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountSiteContactsItemComponentState());
  }

  public editItem(item: Contact): void {
    this.openEditContactDialogEffect$(item);
  }

  public deleteItem(id: number): void {
    this.deleteItemEffect$(id);
  }

  private updateIsSendingRequest(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isSendingRequest: value
      })
    )();
  }

  private registerOpenEditContactDialogEffect(): void {
    this.openEditContactDialogEffect$ = this.componentStore.effect((origin$: Observable<Contact>) =>
      origin$.pipe(
        map((contact) => this.dialogService.open(AccountDialogEditContactComponent, {
          autoFocus: false,
          data: { isEditMode: true, siteID: contact.siteID, contact }
        }))
      )
    );
  }

  private registerDeleteItemEffect(): void {
    this.deleteItemEffect$ = this.componentStore.effect((origin$: Observable<number>) =>
      origin$.pipe(
        map((id) => this.dialogService.open(DialogConfirmationComponent, {
          data: {
            title: this.translateService.instant('ACCOUNT.SHARED.SITE_CONTACTS.DIALOG_DELETE_ITEM.TEXT_TITLE'),
            text: this.translateService.instant('ACCOUNT.SHARED.SITE_CONTACTS.DIALOG_DELETE_ITEM.TEXT_MESSAGE'),
            cancelButtonText: this.translateService.instant('ACCOUNT.SHARED.SITE_CONTACTS.DIALOG_DELETE_ITEM.BUTTON_CANCEL'),
            confirmButtonText: this.translateService.instant('ACCOUNT.SHARED.SITE_CONTACTS.DIALOG_DELETE_ITEM.BUTTON_CONFIRM'),
            resultData: id
          }
        })),
        switchMap((dialogRef) => dialogRef.afterClosed()),
        exhaustMap((result) => {
          if (result) {
            this.updateIsSendingRequest(true);

            return this.tryToDeleteContact(result);
          }

          return EMPTY;
        })
      )
    );
  }

  private tryToDeleteContact(id: number): Observable<void> {
    return this.contactService
      .delete(id)
      .pipe(
        tapResponse(
          () => {
            this.updateIsSendingRequest(false);

            this.deletingSuccessSubject.next(id);

            this.notificationService.success(
              this.translateService.instant('ACCOUNT.SHARED.SITE_CONTACTS.NOTIFICATIONS.TEXT_CONTACT_DELETED')
            );
          },
          () => {
            this.updateIsSendingRequest(false);

            this.notificationService.error(
              this.translateService.instant('ACCOUNT.SHARED.SITE_CONTACTS.NOTIFICATIONS.TEXT_ERROR')
            );
          }
        )
      );
  }
}
