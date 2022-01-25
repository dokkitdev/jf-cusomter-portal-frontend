import { CommonModule } from '@angular/common';
import { CountdownProgressbarComponent } from './countdown-progressbar.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CountdownProgressbarComponent
  ],
  exports: [
    CountdownProgressbarComponent
  ]
})
export class CountdownProgressbarModule { }
