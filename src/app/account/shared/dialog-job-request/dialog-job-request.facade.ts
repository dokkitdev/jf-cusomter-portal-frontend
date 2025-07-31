import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, disable, enable, formGroupReducer, FormGroupState, updateGroup, validate } from 'ngrx-forms';
import { AccountDialogJobRequestForm } from './forms';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse, concatLatestFrom } from '@ngrx/operators';
import { AccountDialogJobRequestComponentState } from './dialog-job-request.state';
import { trimmedRequired } from '@shared/validators';
import { filter, switchMap } from 'rxjs/operators';
import { JobRequest, JobService } from '@shared/job';
import { NotificationService } from '@shared/notification';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from '@shared/dialog';
import { Media } from '@shared/media';
import { maxLength } from 'ngrx-forms/validation';

@Injectable()
export class AccountDialogJobRequestComponentFacade {
  public get isSendingRequest$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isSendingRequest);
  }

  public get formState$(): Observable<FormGroupState<AccountDialogJobRequestForm>> {
    return this.componentStore.select((state) => state.formState);
  }

  public get siteID$(): Observable<number> {
    return this.componentStore.select((state) => state.siteID);
  }

  public get attachments$(): Observable<Array<Media>> {
    return this.componentStore.select((state) => state.attachments);
  }

  private createRequestEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountDialogJobRequestComponentState>,
    private readonly jobService: JobService,
    private readonly dialogService: DialogService,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService
  ) {
    this.resetState();

    this.registerCreateRequestEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountDialogJobRequestComponentState());
  }

  public createRequest(): void {
    this.createRequestEffect$();
  }

  public setSiteID(siteID: number): void {
    this.updataSiteID(siteID);
  }

  public changeAttachments(items: Array<Media>): void {
    this.updateAttachments(items);
  }

  public handleFormStateAction(action: Actions<any>): void {
    this.updateFormState(action);

    this.validateForm();
  }

  private updataSiteID(siteID: number): void {
    this.componentStore.updater((state) => ({
      ...state,
      siteID
    }))();
  }

  private updateFormState(action: Actions<any>): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: formGroupReducer(state.formState, action)
    }))();
  }

  private updateIsSendingRequest(value: boolean): void {
    this.componentStore.updater((state) => ({
      ...state,
      isSendingRequest: value
    }))();
  }

  private updateAttachments(items: Array<Media>): void {
    this.componentStore.updater((state) => ({
      ...state,
      attachments: items
    }))();
  }

  private toggleDisablingForm(value: boolean): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: value ? disable(state.formState) : enable(state.formState)
    }))();
  }

  private validateForm(): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: updateGroup<AccountDialogJobRequestForm>(state.formState, {
        name: validate(trimmedRequired, maxLength(50)),
        description: validate(trimmedRequired)
      })
    }))();
  }

  private registerCreateRequestEffect(): void {
    this.createRequestEffect$ = this.componentStore.effect((origin$: Observable<void>) =>
      origin$.pipe(
        concatLatestFrom(() => [this.formState$, this.attachments$, this.siteID$]),
        filter(([_, formState]) => formState.isValid),
        switchMap(([_, formState, attachments, siteID]) => {
          this.updateIsSendingRequest(true);
          this.toggleDisablingForm(true);

          const request = new JobRequest({
            simproSiteID: siteID,
            name: formState.value.name,
            description: formState.value.description,
            files: attachments.map((item) => item.file)
          });

          return this.jobService.createRequest(request).pipe(
            tapResponse(
              () => {
                this.updateIsSendingRequest(false);
                this.toggleDisablingForm(false);

                this.dialogService.close();

                this.notificationService.success(
                  this.translateService.instant('ACCOUNT.SHARED.DIALOG_JOB_REQUEST.NOTIFICATIONS.TEXT_REQUEST_CREATED')
                );
              },
              () => {
                this.updateIsSendingRequest(false);
                this.toggleDisablingForm(false);

                this.notificationService.error(
                  this.translateService.instant('ACCOUNT.SHARED.DIALOG_JOB_REQUEST.NOTIFICATIONS.TEXT_ERROR')
                );
              }
            )
          );
        })
      )
    );
  }
}
