import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, disable, enable, formGroupReducer, FormGroupState, updateGroup, validate } from 'ngrx-forms';
import { AccountDialogAddDocumentForm } from './forms';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { AccountDialogAddDocumentComponentState } from './dialog-add-document.state';
import { maxLength } from 'ngrx-forms/validation';
import { exhaustMap, filter, withLatestFrom } from 'rxjs/operators';
import { NotificationService } from '@shared/notification';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store';
import { DialogService } from '@shared/dialog';
import { Document, DocumentService } from '@shared/document';
import { trimmedRequired, positiveNumber } from '@shared/validators';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountDialogAddDocumentActions } from './store';

@Injectable()
export class AccountDialogAddDocumentComponentFacade {
  public get isSendingRequest$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isSendingRequest);
  }

  public get document$(): Observable<Document> {
    return this.componentStore.select((state) => state.document);
  }

  public get formState$(): Observable<FormGroupState<AccountDialogAddDocumentForm>> {
    return this.componentStore.select((state) => state.formState);
  }

  private saveChangesEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountDialogAddDocumentComponentState>,
    private readonly store: Store<AppState>,
    private readonly documentService: DocumentService,
    private readonly dialogService: DialogService,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService
  ) {
    this.resetState();

    this.registerSaveChangesEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountDialogAddDocumentComponentState());
  }

  public setIsEditMode(value: boolean): void {
    this.updateIsEditMode(value);
  }

  public saveChanges(): void {
    this.saveChangesEffect$();
  }

  public handleFormStateAction(action: Actions<any>): void {
    this.updateFormState(action);

    this.validateForm();
  }

  private getServerErrorMessage(response: unknown): string {
    return (response as HttpErrorResponse).error.error;
  }

  private updateIsEditMode(value: boolean): void {
    this.componentStore.updater((state) => ({
      ...state,
      isEditMode: value
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
      formState: updateGroup<AccountDialogAddDocumentForm>(state.formState, {
        title: validate(trimmedRequired, maxLength(255)),
        description: validate(trimmedRequired),
        mediaID: validate(positiveNumber)
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

  private registerSaveChangesEffect(): void {
    this.saveChangesEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        withLatestFrom(this.formState$, this.document$),
        filter(([_, formState]) => formState.isValid),
        exhaustMap(([_, formState, document]) => {
          this.updateIsSendingRequest(true);
          this.toggleDisablingForm(true);

          const changedDocument = new Document({
            id: document.id,
            ...formState.value
          });

          return this.tryToCreateDocument(changedDocument);
        })
      )
    );
  }

  private endRequestFailed(errorResponse: unknown): void {
    const errorMessage = this.getServerErrorMessage(errorResponse);

    this.notificationService.error(
      this.translateService.instant(errorMessage || 'ACCOUNT.SHARED.DIALOG_ADD_DOCUMENT.NOTIFICATIONS.TEXT_ERROR')
    );

    this.updateIsSendingRequest(false);
    this.toggleDisablingForm(false);
  }

  private tryToCreateDocument(document: Document): Observable<Document> {
    return this.documentService.create(document).pipe(
      tapResponse(
        (response: Document) => {
          this.updateIsSendingRequest(false);
          this.toggleDisablingForm(false);

          this.dialogService.close();

          this.store.dispatch(
            AccountDialogAddDocumentActions.createDocumentSuccess({
              documentID: response.id
            })
          );

          this.notificationService.success(
            this.translateService.instant('ACCOUNT.SHARED.DIALOG_ADD_DOCUMENT.NOTIFICATIONS.TEXT_DOCUMENT_CREATED')
          );
        },
        (errorResponse) => this.endRequestFailed(errorResponse)
      )
    );
  }
}
