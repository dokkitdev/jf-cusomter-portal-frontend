import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountReportsServiceControlPageComponent } from './service-control.component';
import { AccountReportsServiceControlPageRoutingModule } from './service-control.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountReportsServiceControlPageFacade } from './service-control.facade';

@NgModule({
  declarations: [
    AccountReportsServiceControlPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountReportsServiceControlPageRoutingModule
  ],
  providers: [
    AccountReportsServiceControlPageFacade
  ]
})
export class AccountReportsServiceControlPageModule { }
