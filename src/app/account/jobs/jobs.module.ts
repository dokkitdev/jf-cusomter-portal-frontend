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
import { LetModule, PushModule } from '@ngrx/component';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { HeaderSortModule } from '@shared/header-sort';
import { TableContainerModule } from '@shared/table-container';
import { FilterSelectTextModule } from '@shared/filter-select-text';
import { AccountJobStageMultiselectModule } from '../shared/job-stage-multiselect';
import { AccountJobStatusMultiselectModule } from '../shared/job-status-multiselect';
import { FormDatepickerModule } from '@shared/form-datepicker';
import { FormTimepickerModule } from '@shared/form-timepicker';
import { SnakeModule } from '@shared/snake';
import { AccountCostCenterMultiselectModule } from '../shared/cost-center-multiselect';
import { FilterValuesModule } from '@shared/filter-values';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationElementsModule } from '@shared/pagination-elements';
import { FileModule } from '@shared/file';
import { ButtonModule } from '@shared/button';
import { NotificationModule } from '@shared/notification';

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
    LetModule, PushModule,
    NgForTrackByPropertyModule,
    HeaderSortModule,
    TableContainerModule,
    FilterSelectTextModule,
    AccountJobStageMultiselectModule,
    AccountJobStatusMultiselectModule,
    FormDatepickerModule,
    FormTimepickerModule,
    SnakeModule,
    AccountCostCenterMultiselectModule,
    FilterValuesModule,
    NgxPaginationModule,
    PaginationElementsModule,
    FileModule,
    ButtonModule,
    NotificationModule
  ],
  providers: [
    AccountJobsPageFacade,
    ComponentStore
  ]
})
export class AccountJobsPageModule { }
