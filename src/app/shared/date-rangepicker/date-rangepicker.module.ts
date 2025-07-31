import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateRangepickerComponent } from './date-rangepicker.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgrxFormsModule } from 'ngrx-forms';
import { ValidationErrorsModule } from '@shared/validation-errors';
import { ComponentStore } from '@ngrx/component-store';
import { DateRangepickerFacade } from './date-rangepicker.facade';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LetDirective, PushPipe } from '@ngrx/component';

@NgModule({
  declarations: [DateRangepickerComponent],
  imports: [
    CommonModule,
    NgrxFormsModule,
    ValidationErrorsModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    LetDirective,
    PushPipe
  ],
  providers: [DateRangepickerFacade, ComponentStore],
  exports: [DateRangepickerComponent]
})
export class DateRangepickerModule {}
