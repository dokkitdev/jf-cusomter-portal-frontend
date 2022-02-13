import { NgModule } from '@angular/core';
import { PropertyComponent } from './property.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PropertyComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PropertyComponent
  ]
})
export class PropertyModule { }
