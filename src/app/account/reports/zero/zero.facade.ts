import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@shared/notification';
import { Actions, disable, enable, formGroupReducer, FormGroupState } from 'ngrx-forms';
import { exhaustMap, filter, Observable, withLatestFrom } from 'rxjs';
import { AccountReportsZeroPageState } from './zero.state';
import { AccountReportsZeroPageForm } from './shared/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { tapResponse } from '@ngrx/operators';
import { NotifyService } from '@shared/notify';
import { Router } from '@angular/router';

@Injectable()
export class AccountReportsZeroPageFacade {
  public get isSendingRequest$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isSendingRequest);
  }

  public get formState$(): Observable<FormGroupState<AccountReportsZeroPageForm>> {
    return this.componentStore.select((state) => state.formState);
  }

  public get isReportGenerated$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isReportGenerated);
  }

  private generateReportEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountReportsZeroPageState>,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService,
    private readonly notifyService: NotifyService
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

  public generateNewReport(): void {
    this.updateIsReportGenerated(false);
  }

  public goToReports(): void {
    this.resetState();
    this.router.navigate(['/account/reports/general']);
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

  private updateIsReportGenerated(value: boolean): void {
    this.componentStore.updater((state) => ({
      ...state,
      isReportGenerated: value
    }))();
  }

  private registerGenerateReportEffect(): void {
    this.generateReportEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        withLatestFrom(this.formState$),
        filter(([_, formState]) => formState.isValid),
        exhaustMap(([_, { value }]) => {
          this.updateIsSendingRequest(true);
          this.toggleDisablingForm(true);

          return this.tryToGenerateReport(value.periodDateFrom, value.periodDateTo);
        })
      )
    );
  }

  private tryToGenerateReport(dateFrom: string, dateTo: string): Observable<void> {
    return this.notifyService.generateZeroReport(dateFrom, dateTo).pipe(
      tapResponse(
        () => {
          this.updateIsSendingRequest(false);
          this.toggleDisablingForm(false);
          this.updateIsReportGenerated(true);

          this.notificationService.success(
            this.translateService.instant('ACCOUNT.REPORTS.ZERO.NOTIFICATIONS.TEXT_REPORT_GENERATED')
          );
        },
        (errorResponse: HttpErrorResponse) => {
          this.updateIsSendingRequest(false);
          this.toggleDisablingForm(false);

          this.notificationService.error(
            this.getServerErrorMessage(errorResponse) ||
              this.translateService.instant('ACCOUNT.REPORTS.ZERO.NOTIFICATIONS.TEXT_ERROR')
          );
        }
      )
    );
  }
}
