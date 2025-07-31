import { CustomSelectModule } from './../../../shared/custom-select/custom-select.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountCp12StatusSelectComponent } from './cp12-status-select.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AccountCp12StatusSelectComponent],
  imports: [CommonModule, TranslateModule, CustomSelectModule],
  exports: [AccountCp12StatusSelectComponent]
})
export class AccountCp12StatusSelectModule {}
