import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SnakePipe } from './snake.pipe';

@NgModule({
  declarations: [
    SnakePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SnakePipe
  ]
})
export class SnakeModule { }
