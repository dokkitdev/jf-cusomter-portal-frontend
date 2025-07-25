import { CommonModule } from '@angular/common';
import { FilterSelectTextComponent } from './filter-select-text.component';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { LetDirective, PushPipe } from '@ngrx/component';
import { CustomSelectModule } from '@shared/custom-select';
import { DropdownModule } from '@shared/dropdown';

@NgModule({
  imports: [
    CommonModule,
    NgrxFormsModule,
    DropdownModule,
    CustomSelectModule,
    LetDirective, PushPipe
  ],
  declarations: [
    FilterSelectTextComponent
  ],
  exports: [
    FilterSelectTextComponent
  ]
})
export class FilterSelectTextModule { }
