import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountAdminLogsPageComponent } from './logs.component';
import { AccountAdminLogsPageRoutingModule } from './logs.routing';
import { AccountAdminLogsPageFacade } from './logs.facade';
import { PaginationElementsModule } from '@shared/pagination-elements';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { ButtonModule } from '@shared/button';
import { NotifyModule } from '@shared/notify';
import { NotificationModule } from '@shared/notification';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [AccountAdminLogsPageComponent],
  imports: [
    MatTabsModule,
    CommonModule,
    RouterModule,
    TranslateModule,
    PaginationElementsModule,
    LoadingSpinnerModule,
    ButtonModule,
    AccountAdminLogsPageRoutingModule,
    NotifyModule,
    NotificationModule
  ],
  providers: [AccountAdminLogsPageFacade]
})
export class AccountAdminLogsPageModule {}
