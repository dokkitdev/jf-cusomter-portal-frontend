import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountCostCenterMultiselectComponent } from './cost-center-multiselect.component';
import { CustomMultiselectModule } from '@shared/custom-multiselect';
import { JobModule } from '@shared/job';

@NgModule({
  declarations: [AccountCostCenterMultiselectComponent],
  imports: [CommonModule, CustomMultiselectModule, JobModule],
  exports: [AccountCostCenterMultiselectComponent]
})
export class AccountCostCenterMultiselectModule {}
