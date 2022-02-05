import { PaginationElementsModule } from '@shared/pagination-elements';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountAdminDocumentsPageComponent } from './documents.component';
import { AccountAdminDocumentsPageRoutingModule } from './documents.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentStore } from '@ngrx/component-store';
import { AccountAdminDocumentsPageFacade } from './documents.facade';
import { AccountAdminDocumentsItemComponent } from './shared/components/item/item.component';
import { AccountAdminDocumentsItemsComponent } from './shared/components/items/items.component';
import { AccountAdminDocumentsItemsHeaderComponent } from './shared/components/items-header/items-header.component';
import { AccountAdminDocumentsHeaderComponent } from './shared/components/header/header.component';
import { DocumentModule } from '@shared/document';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { HeaderSortModule } from '@shared/header-sort';
import { ReactiveComponentModule } from '@ngrx/component';
import { TableContainerModule } from '@shared/table-container';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { NotificationModule } from '@shared/notification';
import { MediaModule } from '@shared/media';
import { FileModule } from '@shared/file';
// import { AccountDialogAddDocumentModule } from '@app/account/shared/dialog-add-document';
import { DialogModule } from '@shared/dialog';
import { NgxPaginationModule } from 'ngx-pagination';

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
    AccountAdminDocumentsPageRoutingModule,
    DocumentModule,
    LoadingSpinnerModule,
    HeaderSortModule,
    ReactiveComponentModule,
    TableContainerModule,
    NgForTrackByPropertyModule,
    NotificationModule,
    MediaModule,
    FileModule,
    DialogModule,
    PaginationElementsModule,
    NgxPaginationModule
    // AccountDialogAddDocumentModule
  ],
  providers: [
    AccountAdminDocumentsPageFacade,
    ComponentStore
  ]
})
export class AccountAdminDocumentsPageModule { }
