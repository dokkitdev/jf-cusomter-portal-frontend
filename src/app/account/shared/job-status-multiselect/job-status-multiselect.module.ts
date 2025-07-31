import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountJobStatusMultiselectComponent } from './job-status-multiselect.component';
import { CustomMultiselectModule } from '@shared/custom-multiselect';
import { JobModule } from '@shared/job';

@NgModule({
  declarations: [AccountJobStatusMultiselectComponent],
  imports: [CommonModule, CustomMultiselectModule, JobModule],
  exports: [AccountJobStatusMultiselectComponent]
})
export class AccountJobStatusMultiselectModule {}
