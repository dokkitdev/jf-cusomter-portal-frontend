import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentStore } from '@ngrx/component-store';
import { LetDirective } from '@ngrx/component';
import { AccountReportsGeneralPageFacade } from './general.facade';
import { AccountReportsGeneralRoutingModule } from './general.routing';
import { AccountReportsGeneralComponent } from './general.component';
import { TableContainerModule } from '@shared/table-container';
import { HeaderSortModule } from '@shared/header-sort';

@NgModule({
  declarations: [AccountReportsGeneralComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountReportsGeneralRoutingModule,
    TableContainerModule,
    HeaderSortModule,
    LetDirective
  ],
  providers: [AccountReportsGeneralPageFacade, ComponentStore]
})
export class AccountReportsGeneralModule {}
