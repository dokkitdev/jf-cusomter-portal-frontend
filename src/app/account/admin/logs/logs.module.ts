import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LetDirective } from '@ngrx/component';
import { NgxPaginationModule } from 'ngx-pagination';

import { AccountAdminLogsPageComponent } from './logs.component';
import { AccountAdminLogsPageRoutingModule } from './logs.routing';
import { AccountAdminLogsPageFacade } from './logs.facade';
import { PaginationElementsModule } from '@shared/pagination-elements';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { ButtonModule } from '@shared/button';
import { NotifyModule } from '@shared/notify';
import { NotificationModule } from '@shared/notification';
import { TableContainerModule } from '@shared/table-container';
import { HeaderSortModule } from '@shared/header-sort';
import { FileModule } from '@shared/file';
import { DialogModule } from '@shared/dialog';
import { AccountAdminLogsHeaderComponent } from './shared/components/header/header.component';
import { AccountAdminLogsSystemLogsComponent } from './shared/components/system-logs/system-logs.component';
import { AccountAdminLogsParsingLogsComponent } from './shared/components/parsing-logs/parsing-logs.component';
import { AccountAdminLogsSystemLogsHeaderComponent } from './shared/components/system-logs-header/system-logs-header.component';
import { AccountAdminLogsSystemLogsItemComponent } from './shared/components/system-logs-item/system-logs-item.component';
import { AccountAdminLogsParsingLogsHeaderComponent } from './shared/components/parsing-logs-header/parsing-logs-header.component';
import { AccountAdminLogsParsingLogsItemComponent } from './shared/components/parsing-logs-item/parsing-logs-item.component';
import { AdminLogsParsingLogsDialogComponent } from './shared/components/parsing-logs-dialog/parsing-logs-dialog.component';

@NgModule({
  declarations: [
    AccountAdminLogsPageComponent,
    AccountAdminLogsHeaderComponent,
    AccountAdminLogsSystemLogsComponent,
    AccountAdminLogsParsingLogsComponent,
    AccountAdminLogsSystemLogsHeaderComponent,
    AccountAdminLogsSystemLogsItemComponent,
    AccountAdminLogsParsingLogsHeaderComponent,
    AccountAdminLogsParsingLogsItemComponent,
    AdminLogsParsingLogsDialogComponent
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
    NotificationModule,
    TableContainerModule,
    LetDirective,
    NgxPaginationModule,
    HeaderSortModule,
    FileModule,
    DialogModule
  ],
  providers: [AccountAdminLogsPageFacade]
})
export class AccountAdminLogsPageModule {}
