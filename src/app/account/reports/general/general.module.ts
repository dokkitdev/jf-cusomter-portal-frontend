import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentStore } from '@ngrx/component-store';
import { AccountReportsGeneralPageFacade } from './general.facade';
import { AccountReportsGeneralRoutingModule } from './general.routing';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, TranslateModule, AccountReportsGeneralRoutingModule],
  providers: [AccountReportsGeneralPageFacade, ComponentStore]
})
export class AccountReportsGeneralModule {}
