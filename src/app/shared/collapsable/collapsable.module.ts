import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetModule, PushModule } from '@ngrx/component';
import { CollapsableComponent } from './collapsable.component';
import { CollapsableDirective } from './collapsable.directive';

@NgModule({
  declarations: [
    CollapsableComponent,
    CollapsableDirective
  ],
  imports: [
    CommonModule,
    LetModule, PushModule
  ],
  exports: [
    CollapsableComponent
  ]
})
export class CollapsableModule { }
