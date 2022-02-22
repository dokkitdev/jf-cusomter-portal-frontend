import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountReportsKPIComponent } from './kpi.component';
import { AccountReportsKPIRoutingModule } from './kpi.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountReportsKPIPageFacade } from './kpi.facade';
import { ComponentStore } from '@ngrx/component-store';
import { AccountReportsKPIItemComponent } from './shared/components/item/item.component';
import { AccountReportsKPIItemsComponent } from './shared/components/items/items.component';
import { AccountReportsKPIItemsHeaderComponent } from './shared/components/items-header/items-header.component';
import { AccountReportsKPIFiltersComponent } from './shared/components/filters/filters.component';
import { JobModule } from '@shared/job';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { HeaderSortModule } from '@shared/header-sort';
import { TableContainerModule } from '@shared/table-container';
import { FilterSelectTextModule } from '@shared/filter-select-text';
import { FormDatepickerModule } from '@shared/form-datepicker';
import { FilterValuesModule } from '@shared/filter-values';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationElementsModule } from '@shared/pagination-elements';
import { ExistenceSelectModule } from '@shared/existence-select';
import { FileModule } from '@shared/file';
import { ButtonModule } from '@shared/button';

@NgModule({
  declarations: [
    AccountReportsKPIComponent,
    AccountReportsKPIItemComponent,
    AccountReportsKPIItemsComponent,
    AccountReportsKPIItemsHeaderComponent,
    AccountReportsKPIFiltersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountReportsKPIRoutingModule,
    JobModule,
    ReactiveComponentModule,
    NgForTrackByPropertyModule,
    HeaderSortModule,
    TableContainerModule,
    FilterSelectTextModule,
    FormDatepickerModule,
    FilterValuesModule,
    NgxPaginationModule,
    PaginationElementsModule,
    ExistenceSelectModule,
    FileModule,
    ButtonModule
  ],
  providers: [
    AccountReportsKPIPageFacade,
    ComponentStore
  ]
})
export class AccountReportsKPIModule { }
