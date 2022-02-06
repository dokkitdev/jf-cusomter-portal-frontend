import { CommonModule } from '@angular/common';
import { FormTextareaComponent } from './form-textarea.component';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { ValidationErrorsModule } from '@shared/validation-errors';

@NgModule({
  declarations: [
    FormTextareaComponent
  ],
  imports: [
    CommonModule,
    NgrxFormsModule,
    ValidationErrorsModule
  ],
  exports: [
    FormTextareaComponent
  ]
})
export class FormTextareaModule { }
