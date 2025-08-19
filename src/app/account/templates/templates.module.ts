import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentStore } from '@ngrx/component-store';
import { LetDirective, PushPipe } from '@ngrx/component';

import { AccountTemplatesPageComponent } from './templates.component';
import { AccountTemplatesPageFacade } from './templates.facade';
import { AccountTemplatesItemsComponent } from './shared/components/items/items.component';
import { AccountTemplatesPageRoutingModule } from './templates.routing';

import { TableContainerModule } from '@shared/table-container';
import { MediaService } from '@shared/media';
import { FileService } from '@shared/file';

@NgModule({
  declarations: [AccountTemplatesPageComponent, AccountTemplatesItemsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    LetDirective,
    PushPipe,
    TableContainerModule,
    AccountTemplatesPageRoutingModule
  ],
  providers: [AccountTemplatesPageFacade, ComponentStore, MediaService, FileService]
})
export class AccountTemplatesPageModule {}
