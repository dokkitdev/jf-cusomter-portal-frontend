import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CustomMultiselectModule } from '@shared/custom-multiselect';
import { AccountReportTypeMultiselectComponent } from './report-type-multiselect.component';

@NgModule({
  declarations: [
    AccountReportTypeMultiselectComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    CustomMultiselectModule
  ],
  exports: [
    AccountReportTypeMultiselectComponent
  ]
})
export class AccountReportTypeMultiselectModule { }
