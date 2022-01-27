import { DialogModule } from './../../../shared/dialog/dialog.module';
import { AccountDialogEditUserModule } from './../../shared/dialog-edit-user/dialog-edit-user.module';
import { HeaderSortModule } from './../../../shared/header-sort/header-sort.module';
import { NotificationModule } from './../../../shared/notification/notification.module';
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
import { AccountAdminUsersRoleComponent } from './shared/components/role/role.component';
import { LoadingSpinnerModule } from '@shared/loading-spinner';

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
    ReactiveComponentModule,
    ButtonModule,
    TableContainerModule,
    NgForTrackByPropertyModule,
    NotificationModule,
    HeaderSortModule,
    LoadingSpinnerModule,
    AccountDialogEditUserModule,
    DialogModule
  ],
  providers: [
    AccountAdminUsersPageFacade,
    ComponentStore
  ]
})
export class AccountAdminUsersPageModule { }
