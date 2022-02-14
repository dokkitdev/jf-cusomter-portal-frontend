import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AccountDashboardPageState } from './dashboard.state';
import { switchMap } from 'rxjs/operators';
import { DashboardService, DashboardStatistic } from '@shared/dashboard';
import { NotificationService } from '@shared/notification';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AccountDashboardPageFacade {
  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get dashboardStatistic$(): Observable<DashboardStatistic> {
    return this.componentStore.select((state) => state.dashboardStatistic);
  }

  private loadDashboardStatistic$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountDashboardPageState>,
    private readonly dashboardService: DashboardService,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService
  ) {
    this.resetState();

    this.registerloadDashboardStatistic();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountDashboardPageState());
  }

  public loadDashboardStatistic(): void {
    this.loadDashboardStatistic$();
  }

  private updateIsLoading(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isLoading: value
      })
    )();
  }

  private updateDashboardStatistic(value: DashboardStatistic): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        dashboardStatistic: value
      })
    )();
  }

  private registerloadDashboardStatistic(): void {
    this.loadDashboardStatistic$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        switchMap(() => {
          this.updateIsLoading(true);

          return this.dashboardService
            .getStatistic()
            .pipe(
              tapResponse(
                (response) => {
                  this.updateIsLoading(false);
                  this.updateDashboardStatistic(response);
                },
                () => {
                  this.updateIsLoading(false);
                  this.notificationService.error(
                    this.translateService.instant('ACCOUNT.DASHBOARD.NOTIFICATIONS.TEXT_ERROR')
                  );
                }
              )
            );
        })
      )
    );
  }
}
