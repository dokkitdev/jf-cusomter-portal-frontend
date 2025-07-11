import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountReportsPageComponent } from './reports.component';
import { AccountReportsPageRoutingModule } from './reports.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountReportsFiltersComponent } from './shared/components/filters/filters.component';
import { AccountReportsItemsComponent } from './shared/components/items/items.component';
import { AccountReportsItemsHeaderComponent } from './shared/components/items-header/items-header.component';
import { AccountReportsItemComponent } from './shared/components/item/item.component';
import { ReactiveComponentModule } from '@ngrx/component';
import { FileModule } from '@shared/file';
import { FilterSelectTextModule } from '@shared/filter-select-text';
import { FilterValuesModule } from '@shared/filter-values';
import { FormDatepickerModule } from '@shared/form-datepicker';
import { HeaderSortModule } from '@shared/header-sort';
import { MediaModule } from '@shared/media';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { PaginationElementsModule } from '@shared/pagination-elements';
import { TableContainerModule } from '@shared/table-container';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReportModule } from '@shared/report';
import { AccountReportsPageFacade } from './reports.facade';
import { ComponentStore } from '@ngrx/component-store';
import { AccountReportTypeMultiselectModule } from '../shared/report-type-multiselect';

@NgModule({
  declarations: [
    AccountReportsPageComponent,
    AccountReportsFiltersComponent,
    AccountReportsItemsComponent,
    AccountReportsItemsHeaderComponent,
    AccountReportsItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountReportsPageRoutingModule,
    ReportModule,
    MediaModule,
    FileModule,
    ReactiveComponentModule,
    NgForTrackByPropertyModule,
    HeaderSortModule,
    TableContainerModule,
    FilterSelectTextModule,
    FilterValuesModule,
    FormDatepickerModule,
    NgxPaginationModule,
    PaginationElementsModule,
    AccountReportTypeMultiselectModule
  ],
  providers: [
    AccountReportsPageFacade,
    ComponentStore
  ]
})
export class AccountReportsPageModule { }
