import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountJobsPageComponent } from './jobs.component';
import { AccountJobsPageRoutingModule } from './jobs.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountJobsPageFacade } from './jobs.facade';
import { ComponentStore } from '@ngrx/component-store';
import { AccountJobsItemComponent } from './shared/components/item/item.component';
import { AccountJobsItemsComponent } from './shared/components/items/items.component';
import { AccountJobsItemsHeaderComponent } from './shared/components/items-header/items-header.component';
import { AccountJobsFiltersComponent } from './shared/components/filters/filters.component';
import { JobModule } from '@shared/job';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { HeaderSortModule } from '@shared/header-sort';
import { TableContainerModule } from '@shared/table-container';
import { FilterSelectTextModule } from '@shared/filter-select-text';
import { AccountCustomerSelectModule } from '../shared/customer-select';
// import { AccountSiteSelectModule } from '../shared/site-select';
// import { AccountJobStageMultiselectModule } from '../shared/job-stage-multiselect';
// import { AccountJobStatusMultiselectModule } from '../shared/job-status-multiselect';
import { FormDatepickerModule } from '@shared/form-datepicker';
// import { FormTimepickerModule } from '@shared/form-timepicker';
import { SnakeModule } from '@shared/snake';
import { AccountCostCenterMultiselectModule } from '../shared/cost-center-multiselect';
import { FilterValuesModule } from '@shared/filter-values';

@NgModule({
  declarations: [
    AccountJobsPageComponent,
    AccountJobsItemComponent,
    AccountJobsItemsComponent,
    AccountJobsItemsHeaderComponent,
    AccountJobsFiltersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountJobsPageRoutingModule,
    JobModule,
    ReactiveComponentModule,
    NgForTrackByPropertyModule,
    HeaderSortModule,
    TableContainerModule,
    FilterSelectTextModule,
    AccountCustomerSelectModule,
    // AccountSiteSelectModule,
    // AccountJobStageMultiselectModule,
    // AccountJobStatusMultiselectModule,
    FormDatepickerModule,
    // FormTimepickerModule,
    SnakeModule,
    AccountCostCenterMultiselectModule,
    FilterValuesModule
  ],
  providers: [
    AccountJobsPageFacade,
    ComponentStore
  ]
})
export class AccountJobsPageModule { }
