import { CommonModule } from '@angular/common';
import { FormTextComponent } from './form-text.component';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { ValidationErrorsModule } from '@shared/validation-errors';

@NgModule({
  declarations: [
    FormTextComponent
  ],
  imports: [
    CommonModule,
    NgrxFormsModule,
    ValidationErrorsModule
  ],
  exports: [
    FormTextComponent
  ]
})
export class FormTextModule { }
