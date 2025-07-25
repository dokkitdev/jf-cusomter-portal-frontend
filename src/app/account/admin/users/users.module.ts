import { PaginationElementsModule } from '@shared/pagination-elements';
import { DialogModule } from '@shared/dialog';
import { AccountDialogEditUserModule } from './../../shared/dialog-edit-user';
import { HeaderSortModule } from '@shared/header-sort';
import { NotificationModule } from '@shared/notification';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { TableContainerModule } from '@shared/table-container';
import { ButtonModule } from '@shared/button';
import { FilterValuesModule } from '@shared/filter-values';
import { FilterSelectTextModule } from '@shared/filter-select-text';
import { AccountCustomerSelectModule } from './../../shared/customer-select';
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
import { LetModule, PushModule } from '@ngrx/component';
import { AccountAdminUsersRoleComponent } from './shared/components/role/role.component';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AccountAdminUsersPageComponent,
    AccountAdminUsersHeaderComponent,
    AccountAdminUsersItemComponent,
    AccountAdminUsersItemsComponent,
    AccountAdminUsersFiltersComponent,
    AccountAdminUsersItemsHeaderComponent,
    AccountAdminUsersRoleComponent
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
    LetModule, PushModule,
    ButtonModule,
    TableContainerModule,
    NgForTrackByPropertyModule,
    NotificationModule,
    HeaderSortModule,
    LoadingSpinnerModule,
    AccountDialogEditUserModule,
    DialogModule,
    NgxPaginationModule,
    PaginationElementsModule
  ],
  providers: [
    AccountAdminUsersPageFacade,
    ComponentStore
  ]
})
export class AccountAdminUsersPageModule { }
