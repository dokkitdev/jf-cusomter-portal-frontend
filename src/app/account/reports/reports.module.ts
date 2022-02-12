import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountReportsPageComponent } from './reports.component';
import { AccountReportsPageRoutingModule } from './reports.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountReportsPageFacade } from './reports.facade';

@NgModule({
  declarations: [
    AccountReportsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountReportsPageRoutingModule
  ],
  providers: [
    AccountReportsPageFacade
  ]
})
export class AccountReportsPageModule { }
