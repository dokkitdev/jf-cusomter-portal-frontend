import { NgModule } from '@angular/core';
import { ProgressBarDirective } from './progress-bar.directive';

@NgModule({
  declarations: [ProgressBarDirective],
  exports: [ProgressBarDirective]
})
export class ProgressBarModule {}
