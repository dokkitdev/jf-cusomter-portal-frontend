import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { FormCheckboxComponent } from './form-checkbox.component';

@NgModule({
  declarations: [FormCheckboxComponent],
  imports: [CommonModule, NgrxFormsModule],
  exports: [FormCheckboxComponent]
})
export class FormCheckboxModule {}
