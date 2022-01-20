import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownDirective
  ]
})
export class DropdownModule { }
