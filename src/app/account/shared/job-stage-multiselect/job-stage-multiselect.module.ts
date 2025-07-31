import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { AccountJobStageMultiselectComponent } from './job-stage-multiselect.component';
import { CustomMultiselectModule } from '@shared/custom-multiselect';

@NgModule({
  declarations: [AccountJobStageMultiselectComponent],
  imports: [CommonModule, TranslateModule, CustomMultiselectModule],
  exports: [AccountJobStageMultiselectComponent]
})
export class AccountJobStageMultiselectModule {}
