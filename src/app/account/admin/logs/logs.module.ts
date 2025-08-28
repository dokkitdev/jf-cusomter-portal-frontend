import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { AccountAdminLogsHeaderComponent } from './shared/components/header/header.component';
import { AccountAdminLogsSystemLogsComponent } from './shared/components/system-logs/system-logs.component';
import { AccountAdminLogsParsingLogsComponent } from './shared/components/parsing-logs/parsing-logs.component';

@NgModule({
  declarations: [
    AccountAdminLogsPageComponent,
    AccountAdminLogsHeaderComponent,
    AccountAdminLogsSystemLogsComponent,
    AccountAdminLogsParsingLogsComponent
  ],
  imports: [
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
