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
    PaginationElementsModule
  ],
  providers: [
    AccountReportsServiceControlFacade,
    ComponentStore
  ]
})
export class AccountReportsServiceControlPageModule { }
