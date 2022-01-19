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
    AccountAdminUsersPageRoutingModule
  ],
  providers: [
    AccountAdminUsersPageFacade
  ]
})
export class AccountAdminUsersPageModule { }
