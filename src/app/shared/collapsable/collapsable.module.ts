import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetDirective, PushPipe } from '@ngrx/component';
import { CollapsableComponent } from './collapsable.component';
import { CollapsableDirective } from './collapsable.directive';

@NgModule({
  declarations: [CollapsableComponent, CollapsableDirective],
  imports: [CommonModule, LetDirective, PushPipe],
  exports: [CollapsableComponent]
})
export class CollapsableModule {}
