import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountAdminUsersPageComponent } from './users.component';
import { AccountAdminUsersPageRoutingModule } from './users.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountAdminUsersPageFacade } from './users.facade';

@NgModule({
  declarations: [
    AccountAdminUsersPageComponent
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
