import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountAssetsPageComponent } from './assets.component';
import { AccountAssetsPageRoutingModule } from './assets.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountAssetsPageFacade } from './assets.facade';
import { ComponentStore } from '@ngrx/component-store';
import { AssetModule } from '@shared/asset';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { HeaderSortModule } from '@shared/header-sort';
import { TableContainerModule } from '@shared/table-container';
import { AccountAssetsItemComponent } from './shared/components/item/item.component';
import { AccountAssetsItemsComponent } from './shared/components/items/items.component';
import { AccountAssetsItemsHeaderComponent } from './shared/components/items-header/items-header.component';
import { AccountAssetsFiltersComponent } from './shared/components/filters/filters.component';
import { FilterSelectTextModule } from '@shared/filter-select-text';
import { FilterValuesModule } from '@shared/filter-values';
import { FormDatepickerModule } from '@shared/form-datepicker';
import { AccountCustomerSelectModule } from '../shared/customer-select';
import { AccountAssetServiceLevelMultiselectModule } from '../shared/asset-service-level-multiselect';
import { AccountAssetTestResultSelectModule } from '../shared/asset-test-result-select';
import { ExistenceSelectModule } from '@shared/existence-select';
import { SnakeModule } from '@shared/snake';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationElementsModule } from '@shared/pagination-elements';
import { FileModule } from '@shared/file';
import { ButtonModule } from '@shared/button';

@NgModule({
  declarations: [
    AccountAssetsPageComponent,
    AccountAssetsItemComponent,
    AccountAssetsItemsComponent,
    AccountAssetsItemsHeaderComponent,
    AccountAssetsFiltersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountAssetsPageRoutingModule,
    AssetModule,
    ReactiveComponentModule,
    NgForTrackByPropertyModule,
    HeaderSortModule,
    TableContainerModule,
    FilterSelectTextModule,
    FilterValuesModule,
    FormDatepickerModule,
    AccountCustomerSelectModule,
    AccountAssetServiceLevelMultiselectModule,
    AccountAssetTestResultSelectModule,
    ExistenceSelectModule,
    SnakeModule,
    NgxPaginationModule,
    PaginationElementsModule,
    FileModule,
    ButtonModule
  ],
  providers: [
    AccountAssetsPageFacade,
    ComponentStore
  ]
})
export class AccountAssetsPageModule { }
