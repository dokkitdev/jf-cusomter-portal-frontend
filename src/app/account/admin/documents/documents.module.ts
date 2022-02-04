import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountAdminDocumentsPageComponent } from './documents.component';
import { AccountAdminDocumentsPageRoutingModule } from './documents.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountAdminDocumentsPageFacade } from './documents.facade';
import { AccountAdminDocumentsItemComponent } from './shared/components/item/item.component';
import { AccountAdminDocumentsItemsComponent } from './shared/components/items/items.component';
import { AccountAdminDocumentsItemsHeaderComponent } from './shared/components/items-header/items-header.component';
import { AccountAdminDocumentsHeaderComponent } from './shared/components/header/header.component';

@NgModule({
  declarations: [
    AccountAdminDocumentsPageComponent,
    AccountAdminDocumentsItemComponent,
    AccountAdminDocumentsItemsComponent,
    AccountAdminDocumentsItemsHeaderComponent,
    AccountAdminDocumentsHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountAdminDocumentsPageRoutingModule
  ],
  providers: [
    AccountAdminDocumentsPageFacade
  ]
})
export class AccountAdminDocumentsPageModule { }
