import { NgrxFormsModule } from 'ngrx-forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormRadioComponent } from './form-radio.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FormRadioComponent],
  imports: [CommonModule, TranslateModule, NgrxFormsModule],
  exports: [FormRadioComponent]
})
export class FormRadioModule {}
