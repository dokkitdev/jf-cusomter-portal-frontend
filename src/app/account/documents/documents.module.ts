import { PaginationElementsModule } from '@shared/pagination-elements';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountDocumentsPageComponent } from './documents.component';
import { AccountDocumentsPageRoutingModule } from './documents.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountDocumentsPageFacade } from './documents.facade';
import { ComponentStore } from '@ngrx/component-store';
import { AccountDocumentsItemComponent } from './shared/components/item/item.component';
import { AccountDocumentsItemsComponent } from './shared/components/items/items.component';
import { AccountDocumentsItemsHeaderComponent } from './shared/components/items-header/items-header.component';
import { AccountDocumentsFiltersComponent } from './shared/components/filters/filters.component';
import { DocumentModule } from '@shared/document';
import { MediaModule } from '@shared/media';
import { FileModule } from '@shared/file';
import { LetDirective, PushPipe } from '@ngrx/component';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { HeaderSortModule } from '@shared/header-sort';
import { TableContainerModule } from '@shared/table-container';
import { FilterSelectTextModule } from '@shared/filter-select-text';
import { FilterValuesModule } from '@shared/filter-values';
import { FormDatepickerModule } from '@shared/form-datepicker';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AccountDocumentsPageComponent,
    AccountDocumentsItemComponent,
    AccountDocumentsItemsComponent,
    AccountDocumentsItemsHeaderComponent,
    AccountDocumentsFiltersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountDocumentsPageRoutingModule,
    DocumentModule,
    MediaModule,
    FileModule,
    LetDirective, PushPipe,
    NgForTrackByPropertyModule,
    HeaderSortModule,
    TableContainerModule,
    FilterSelectTextModule,
    FilterValuesModule,
    FormDatepickerModule,
    NgxPaginationModule,
    PaginationElementsModule
  ],
  providers: [
    AccountDocumentsPageFacade,
    ComponentStore
  ]
})
export class AccountDocumentsPageModule { }
