import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ValidationErrorsComponent } from './validation-errors.component';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';

@NgModule({
  declarations: [
    ValidationErrorsComponent
  ],
  imports: [
    CommonModule,
    NgForTrackByPropertyModule
  ],
  exports: [
    ValidationErrorsComponent
  ]
})
export class ValidationErrorsModule { }
