import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentStore } from '@ngrx/component-store';
import { LetDirective, PushPipe } from '@ngrx/component';

import { AccountTemplatesPageComponent } from './templates.component';
import { AccountTemplatesPageFacade } from './templates.facade';
import { AccountTemplatesItemsComponent } from './shared/components/items/items.component';
import { AccountTemplateCategoryComponent } from './shared/components/category/category.component';
import { AccountTemplatesPageRoutingModule } from './templates.routing';
import { NotifyModule } from '@shared/notify';

import { TableContainerModule } from '@shared/table-container';
import { FileService, FileInputService } from '@shared/file';
import { NotificationModule } from '@shared/notification';

@NgModule({
  declarations: [AccountTemplatesPageComponent, AccountTemplatesItemsComponent, AccountTemplateCategoryComponent],
  imports: [
    CommonModule,
    TranslateModule,
    LetDirective,
    PushPipe,
    TableContainerModule,
    AccountTemplatesPageRoutingModule,
    NotificationModule,
    NotifyModule
  ],
  providers: [AccountTemplatesPageFacade, ComponentStore, FileService, FileInputService]
})
export class AccountTemplatesPageModule {}
