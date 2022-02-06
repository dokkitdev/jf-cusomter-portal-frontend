import { CommonModule } from '@angular/common';
import { FormDatepickerComponent } from './form-datepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { ValidationErrorsModule } from '@shared/validation-errors';

@NgModule({
  declarations: [
    FormDatepickerComponent
  ],
  imports: [
    CommonModule,
    NgrxFormsModule,
    ValidationErrorsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    FormDatepickerComponent
  ]
})
export class FormDatepickerModule { }
