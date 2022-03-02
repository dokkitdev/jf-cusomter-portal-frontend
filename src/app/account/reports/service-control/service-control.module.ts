import { AccountCustomAssetTypeSelectModule } from './../../shared/custom-asset-type-select/custom-asset-type-select.module';
import { AccountJobStageMultiselectModule } from './../../shared/job-stage-multiselect';
import { FilterSelectTextModule } from '@shared/filter-select-text/';
import { AccountCp12StatusSelectModule } from './../../shared/cp12-status-select';
import { FormDatepickerModule } from '@shared/form-datepicker';
import { AccountSiteSelectModule } from './../../shared/site-select';
import { FilterValuesModule } from '@shared/filter-values';
import { HeaderSortModule } from '@shared/header-sort';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { ComponentStore } from '@ngrx/component-store';
import { AccountReportsServiceControlFacade } from './service-control.facade';
import { PaginationElementsModule } from '@shared/pagination-elements';
import { TableContainerModule } from '@shared/table-container';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountReportsServiceControlPageComponent } from './service-control.component';
import { AccountReportsServiceControlPageRoutingModule } from './service-control.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountReportsServiceControlItemsComponent } from './shared/components/items/items.component';
import { AccountReportsServiceControlItemComponent } from './shared/components/item/item.component';
import { AccountReportsServiceControlItemsHeaderComponent } from './shared/components/items-header/items-header.component';
import { AccountReportsServiceControlHeaderComponent } from './shared/components/header/header.component';
import { AccountReportsServiceControlFiltersComponent } from './shared/components/filters/filters.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveComponentModule } from '@ngrx/component';
import { AssetModule } from '@shared/asset';
import { ButtonModule } from '@shared/button';
import { FileModule } from '@shared/file';
import { NotificationModule } from '@shared/notification';

@NgModule({
  declarations: [
    AccountReportsServiceControlPageComponent,
    AccountReportsServiceControlItemsComponent,
    AccountReportsServiceControlItemComponent,
    AccountReportsServiceControlItemsHeaderComponent,
    AccountReportsServiceControlHeaderComponent,
    AccountReportsServiceControlFiltersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountReportsServiceControlPageRoutingModule,
    TableContainerModule,
    NgxPaginationModule,
    PaginationElementsModule,
    ReactiveComponentModule,
    AssetModule,
    NgForTrackByPropertyModule,
    HeaderSortModule,
    FilterValuesModule,
    AccountSiteSelectModule,
    AccountJobStageMultiselectModule,
    ButtonModule,
    FileModule,
    NotificationModule,
    FormDatepickerModule,
    AccountCp12StatusSelectModule,
    FilterSelectTextModule,
    AccountCustomAssetTypeSelectModule
  ],
  providers: [
    AccountReportsServiceControlFacade,
    ComponentStore
  ]
})
export class AccountReportsServiceControlPageModule { }
