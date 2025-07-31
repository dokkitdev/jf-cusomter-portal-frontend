import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@shared/notification';
import { AppState } from '@shared/store';
import { Actions, disable, enable, formGroupReducer, FormGroupState } from 'ngrx-forms';
import { filter, Observable, tap, withLatestFrom } from 'rxjs';
import { AccountReportsZeroPageState } from './zero.state';
import { AccountReportsZeroPageForm } from './shared/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AccountReportsZeroPageFacade {
  public get isSendingRequest$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isSendingRequest);
  }

  public get formState$(): Observable<FormGroupState<AccountReportsZeroPageForm>> {
    return this.componentStore.select((state) => state.formState);
  }

  private generateReportEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountReportsZeroPageState>,
    private readonly store: Store<AppState>,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService
  ) {
    this.resetState();

    this.registerGenerateReportEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountReportsZeroPageState());
  }

  public generateReport(): void {
    this.generateReportEffect$();
  }

  public handleFormStateAction(action: Actions<any>): void {
    this.updateFormState(action);
  }

  private getServerErrorMessage(response: unknown): string {
    return (response as HttpErrorResponse).error.error;
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

  private toggleDisablingForm(value: boolean): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: value ? disable(state.formState) : enable(state.formState)
    }))();
  }

  private registerGenerateReportEffect(): void {
    this.generateReportEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        withLatestFrom(this.formState$),
        filter(([_, formState]) => formState.isValid),
        tap(() =>
          this.notificationService.error(this.translateService.instant('SHARED.NOTIFICATIONS.TEXT_UNDER_CONSTRUCTION'))
        )
      )
    );
  }
}
