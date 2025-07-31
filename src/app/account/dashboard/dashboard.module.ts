import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountDashboardPageComponent } from './dashboard.component';
import { AccountDashboardPageRoutingModule } from './dashboard.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountDashboardPageFacade } from './dashboard.facade';
import { ComponentStore } from '@ngrx/component-store';
import { DashboardModule } from '@shared/dashboard';
import { LetDirective, PushPipe } from '@ngrx/component';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { NotificationModule } from '@shared/notification';
import { AccountDashboardStatisticComponent } from './shared/components/statistic/statistic.component';
import { AccountDashboardStatisticItemComponent } from './shared/components/statistic-item/statistic-item.component';
import { AccountDashboardStatisticJobsComponent } from './shared/components/statistic-jobs/statistic-jobs.component';
import { AccountDashboardStatisticLinkComponent } from './shared/components/statistic-link/statistic-link.component';
import { AccountDashboardStatisticLinksComponent } from './shared/components/statistic-links/statistic-links.component';

@NgModule({
  declarations: [
    AccountDashboardPageComponent,
    AccountDashboardStatisticComponent,
    AccountDashboardStatisticItemComponent,
    AccountDashboardStatisticJobsComponent,
    AccountDashboardStatisticLinkComponent,
    AccountDashboardStatisticLinksComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountDashboardPageRoutingModule,
    DashboardModule,
    LetDirective,
    PushPipe,
    LoadingSpinnerModule,
    NotificationModule
  ],
  providers: [AccountDashboardPageFacade, ComponentStore]
})
export class AccountDashboardPageModule {}
