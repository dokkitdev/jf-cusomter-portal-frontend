import { AccountCustomAssetTypeMultiselectModule } from './../../shared/custom-asset-type-multiselect';
import { AccountJobStageMultiselectModule } from './../../shared/job-stage-multiselect';
import { AccountCp12StatusSelectModule } from './../../shared/cp12-status-select';
import { FormDatepickerModule } from '@shared/form-datepicker';
import { AccountSiteSelectModule } from './../../shared/site-select';
import { FilterValuesModule } from '@shared/filter-values';
import { HeaderSortModule } from '@shared/header-sort';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { ComponentStore } from '@ngrx/component-store';
import { AccountReportsServiceControlFacade } from './ashp-unvented-service-control.facade';
import { PaginationElementsModule } from '@shared/pagination-elements';
import { TableContainerModule } from '@shared/table-container';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountReportsASHPUnventedServiceControlPageComponent } from './ashp-unvented-service-control.component';
import { AccountReportsServiceControlPageRoutingModule } from './ashp-unvented-service-control.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountReportsASHPUnventedServiceControlItemsComponent } from './shared/components/items/items.component';
import { AccountReportsASHPUnventedServiceControlItemComponent } from './shared/components/item/item.component';
import { AccountReportsASHPUnventedServiceControlItemsHeaderComponent } from './shared/components/items-header/items-header.component';
import { AccountReportsASHPUnventedServiceControlHeaderComponent } from './shared/components/header/header.component';
import { AccountReportsServiceControlFiltersComponent } from './shared/components/filters/filters.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveComponentModule } from '@ngrx/component';
import { AssetModule } from '@shared/asset';
import { ButtonModule } from '@shared/button';
import { FileModule } from '@shared/file';
import { NotificationModule } from '@shared/notification';

@NgModule({
  declarations: [
    AccountReportsASHPUnventedServiceControlPageComponent,
    AccountReportsASHPUnventedServiceControlItemsComponent,
    AccountReportsASHPUnventedServiceControlItemComponent,
    AccountReportsASHPUnventedServiceControlItemsHeaderComponent,
    AccountReportsASHPUnventedServiceControlHeaderComponent,
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
    AccountCustomAssetTypeMultiselectModule
  ],
  providers: [
    AccountReportsServiceControlFacade,
    ComponentStore
  ]
})
export class AccountReportsASHPUnventedServiceControlPageModule { }
