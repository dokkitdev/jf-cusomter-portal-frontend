import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountAdminPageComponent } from './admin.component';
import { AccountAdminPageRoutingModule } from './admin.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AccountAdminPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountAdminPageRoutingModule
  ]
})
export class AccountAdminPageModule { }
