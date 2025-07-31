import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Actions,
  disable,
  enable,
  formGroupReducer,
  FormGroupState,
  setValue,
  updateGroup,
  validate
} from 'ngrx-forms';
import { AccountDialogEditContactForm } from './forms';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { AccountDialogEditContactComponentState } from './dialog-edit-contact.state';
import { email, maxLength } from 'ngrx-forms/validation';
import { exhaustMap, filter, tap, withLatestFrom } from 'rxjs/operators';
import { Contact, ContactService } from '@shared/contact';
import { trimmedRequired } from '@shared/validators';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store';
import { DialogService } from '@shared/dialog';
import { NotificationService } from '@shared/notification';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountDialogEditContactActions } from './store';

@Injectable()
export class AccountDialogEditContactComponentFacade {
  public get isSendingRequest$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isSendingRequest);
  }

  public get isEditMode$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isEditMode);
  }

  public get siteID$(): Observable<number | undefined> {
    return this.componentStore.select((state) => state.siteID);
  }

  public get contact$(): Observable<Contact> {
    return this.componentStore.select((state) => state.contact);
  }

  public get formState$(): Observable<FormGroupState<AccountDialogEditContactForm>> {
    return this.componentStore.select((state) => state.formState);
  }

  private initComponentEffect$: (contact: Contact) => Observable<void>;
  private saveChangesEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountDialogEditContactComponentState>,
    private readonly store: Store<AppState>,
    private readonly contactService: ContactService,
    private readonly dialogService: DialogService,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService
  ) {
    this.resetState();

    this.registerInitComponentEffect();
    this.registerSaveChangesEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountDialogEditContactComponentState());
  }

  public setIsEditMode(value: boolean): void {
    this.updateIsEditMode(value);
  }

  public setSiteID(id: number | undefined): void {
    this.updateSiteID(id);
  }

  public initComponent(contact: Contact): void {
    this.initComponentEffect$(contact);
  }

  public saveChanges(): void {
    this.saveChangesEffect$();
  }

  public handleFormStateAction(action: Actions<any>): void {
    this.updateFormState(action);

    this.validateForm();
  }

  private updateIsEditMode(value: boolean): void {
    this.componentStore.updater((state) => ({
      ...state,
      isEditMode: value
    }))();
  }

  private updateSiteID(id: number | undefined): void {
    this.componentStore.updater((state) => ({
      ...state,
      siteID: id
    }))();
  }

  private updateFormState(action: Actions<any>): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: formGroupReducer(state.formState, action)
    }))();
  }

  private validateForm(): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: updateGroup<AccountDialogEditContactForm>(state.formState, {
        title: validate(maxLength(255)),
        givenName: validate(trimmedRequired, maxLength(255)),
        familyName: validate(maxLength(255)),
        email: validate(email),
        position: validate(maxLength(255))
      })
    }))();
  }

  private updateContactFormState(contact: Contact): void {
    this.componentStore.updater((state) => ({
      ...state,
      contact,
      formState: updateGroup<AccountDialogEditContactForm>(state.formState, {
        title: setValue(contact.title),
        givenName: setValue(contact.givenName),
        familyName: setValue(contact.familyName),
        email: setValue(contact.email),
        workPhone: setValue(contact.workPhone),
        cellPhone: setValue(contact.cellPhone),
        position: setValue(contact.position)
      })
    }))();
  }

  private updateIsSendingRequest(value: boolean): void {
    this.componentStore.updater((state) => ({
      ...state,
      isSendingRequest: value
    }))();
  }

  private toggleDisablingForm(value: boolean): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: value ? disable(state.formState) : enable(state.formState)
    }))();
  }

  private registerInitComponentEffect(): void {
    this.initComponentEffect$ = this.componentStore.effect((origin$: Observable<Contact>) =>
      origin$.pipe(
        withLatestFrom(this.isEditMode$),
        filter(([_, isEditMode]) => isEditMode),
        tap(([contact]) => this.updateContactFormState(contact))
      )
    );
  }

  private registerSaveChangesEffect(): void {
    this.saveChangesEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        withLatestFrom(this.formState$, this.isEditMode$, this.contact$, this.siteID$),
        filter(([_, formState]) => formState.isValid),
        exhaustMap(([_, formState, isEditMode, contact, siteID]) => {
          this.updateIsSendingRequest(true);
          this.toggleDisablingForm(true);

          const changedContact = new Contact({
            ...formState.value,
            siteID,
            id: contact.id
          });

          return isEditMode ? this.tryToUpdateContact(changedContact) : this.tryToCreateContact(changedContact);
        })
      )
    );
  }

  private endRequestFailed(errorResponse: unknown): void {
    const errorMessage = (errorResponse as HttpErrorResponse).error.error;

    this.notificationService.error(
      this.translateService.instant(errorMessage || 'ACCOUNT.SHARED.DIALOG_EDIT_CONTACT.NOTIFICATIONS.TEXT_ERROR')
    );

    this.updateIsSendingRequest(false);
    this.toggleDisablingForm(false);
  }

  private tryToCreateContact(contact: Contact): Observable<Contact> {
    return this.contactService.create(contact).pipe(
      tapResponse(
        (response) => {
          this.updateIsSendingRequest(false);
          this.toggleDisablingForm(false);

          this.dialogService.close();

          this.store.dispatch(
            AccountDialogEditContactActions.createContactSuccess({
              contact: response
            })
          );

          this.notificationService.success(
            this.translateService.instant('ACCOUNT.SHARED.DIALOG_EDIT_CONTACT.NOTIFICATIONS.TEXT_CONTACT_CREATED')
          );
        },
        (errorResponse) => this.endRequestFailed(errorResponse)
      )
    );
  }

  private tryToUpdateContact(contact: Contact): Observable<void> {
    return this.contactService.update(contact).pipe(
      tapResponse(
        () => {
          this.updateIsSendingRequest(false);
          this.toggleDisablingForm(false);

          this.dialogService.close();

          this.store.dispatch(AccountDialogEditContactActions.updateContactSuccess({ contact }));

          this.notificationService.success(
            this.translateService.instant('ACCOUNT.SHARED.DIALOG_EDIT_CONTACT.NOTIFICATIONS.TEXT_CONTACT_UPDATED')
          );
        },
        (errorResponse) => this.endRequestFailed(errorResponse)
      )
    );
  }
}
