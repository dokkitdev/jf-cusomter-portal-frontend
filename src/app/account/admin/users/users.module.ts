import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { TableContainerModule } from './../../../shared/table-container/table-container.module';
import { ButtonModule } from '@shared/button';
import { FilterValuesModule } from './../../../shared/filter-values/filter-values.module';
import { FilterSelectTextModule } from './../../../shared/filter-select-text/filter-select-text.module';
import { AccountCustomerSelectModule } from './../../shared/customer-select/customer-select.module';
import { NgrxFormsModule } from 'ngrx-forms';
import { ComponentStore } from '@ngrx/component-store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountAdminUsersPageComponent } from './users.component';
import { AccountAdminUsersPageRoutingModule } from './users.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountAdminUsersPageFacade } from './users.facade';
import { AccountAdminUsersHeaderComponent } from './shared/components/header/header.component';
import { AccountAdminUsersItemComponent } from './shared/components/item/item.component';
import { AccountAdminUsersItemsComponent } from './shared/components/items/items.component';
import { AccountAdminUsersFiltersComponent } from './shared/components/filters/filters.component';
import { AccountAdminUsersItemsHeaderComponent } from './shared/components/items-header/items-header.component';
import { ReactiveComponentModule } from '@ngrx/component';

@NgModule({
  declarations: [
    AccountAdminUsersPageComponent,
    AccountAdminUsersHeaderComponent,
    AccountAdminUsersItemComponent,
    AccountAdminUsersItemsComponent,
    AccountAdminUsersFiltersComponent,
    AccountAdminUsersItemsHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountAdminUsersPageRoutingModule,
    NgrxFormsModule,
    FilterSelectTextModule,
    FilterValuesModule,
    AccountCustomerSelectModule,
    ReactiveComponentModule,
    ButtonModule,
    TableContainerModule,
    NgForTrackByPropertyModule
  ],
  providers: [
    AccountAdminUsersPageFacade,
    ComponentStore
  ]
})
export class AccountAdminUsersPageModule { }
