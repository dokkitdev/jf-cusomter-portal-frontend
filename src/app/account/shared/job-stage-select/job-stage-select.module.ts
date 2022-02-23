import { CustomSelectModule } from './../../../shared/custom-select/custom-select.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountJobStageSelectComponent } from './job-stage-select.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AccountJobStageSelectComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    CustomSelectModule
  ],
  exports: [
    AccountJobStageSelectComponent
  ]
})
export class AccountJobStageSelectModule { }
