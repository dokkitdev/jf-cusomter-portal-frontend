import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { AccountCustomerSelectComponent } from './customer-select.component';
import { CustomSelectModule } from '@shared/custom-select';
import { CustomerModule } from '@shared/customer';

@NgModule({
  declarations: [AccountCustomerSelectComponent],
  imports: [CommonModule, TranslateModule, CustomSelectModule, CustomerModule],
  exports: [AccountCustomerSelectComponent]
})
export class AccountCustomerSelectModule {}
