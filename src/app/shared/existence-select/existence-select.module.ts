import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { ExistenceSelectComponent } from './existence-select.component';
import { CustomSelectModule } from '@shared/custom-select';

@NgModule({
  declarations: [ExistenceSelectComponent],
  imports: [CommonModule, TranslateModule, CustomSelectModule],
  exports: [ExistenceSelectComponent]
})
export class ExistenceSelectModule {}
