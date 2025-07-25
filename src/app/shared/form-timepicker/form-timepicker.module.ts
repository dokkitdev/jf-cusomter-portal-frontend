import { CommonModule } from '@angular/common';
import { FormTimepickerComponent } from './form-timepicker.component';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { ValidationErrorsModule } from '@shared/validation-errors';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

@NgModule({
  declarations: [
    FormTimepickerComponent
  ],
  imports: [
    CommonModule,
    NgrxFormsModule,
    ValidationErrorsModule,
    NgxMatTimepickerModule
  ],
  exports: [
    FormTimepickerComponent
  ]
})
export class FormTimepickerModule { }
