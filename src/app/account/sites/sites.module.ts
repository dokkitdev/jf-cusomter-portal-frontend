import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountSitesPageComponent } from './sites.component';
import { AccountSitesPageRoutingModule } from './sites.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountSitesPageFacade } from './sites.facade';
import { ComponentStore } from '@ngrx/component-store';
import { SiteModule } from '@shared/site';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { HeaderSortModule } from '@shared/header-sort';
import { TableContainerModule } from '@shared/table-container';
import { FilterSelectTextModule } from '@shared/filter-select-text';
import { ExistenceSelectModule } from '@shared/existence-select';
import { FilterValuesModule } from '@shared/filter-values';
import { AccountSitesItemComponent } from './shared/components/item/item.component';
import { AccountSitesItemsComponent } from './shared/components/items/items.component';
import { AccountSitesItemsHeaderComponent } from './shared/components/items-header/items-header.component';
import { AccountSitesFiltersComponent } from './shared/components/filters/filters.component';
import { AccountCustomerSelectModule } from '../shared/customer-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationElementsModule } from '@shared/pagination-elements';
import { FileModule } from '@shared/file';
import { ButtonModule } from '@shared/button';

@NgModule({
  declarations: [
    AccountSitesPageComponent,
    AccountSitesItemComponent,
    AccountSitesItemsComponent,
    AccountSitesItemsHeaderComponent,
    AccountSitesFiltersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountSitesPageRoutingModule,
    SiteModule,
    ReactiveComponentModule,
    NgForTrackByPropertyModule,
    HeaderSortModule,
    TableContainerModule,
    FilterSelectTextModule,
    ExistenceSelectModule,
    FilterValuesModule,
    AccountCustomerSelectModule,
    NgxPaginationModule,
    PaginationElementsModule,
    FileModule,
    ButtonModule
  ],
  providers: [
    AccountSitesPageFacade,
    ComponentStore
  ]
})
export class AccountSitesPageModule { }
