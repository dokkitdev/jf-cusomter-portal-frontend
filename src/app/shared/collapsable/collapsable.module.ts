import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveComponentModule } from '@ngrx/component';
import { CollapsableComponent } from './collapsable.component';
import { CollapsableDirective } from './collapsable.directive';

@NgModule({
  declarations: [
    CollapsableComponent,
    CollapsableDirective
  ],
  imports: [
    CommonModule,
    ReactiveComponentModule
  ],
  exports: [
    CollapsableComponent
  ]
})
export class CollapsableModule { }
