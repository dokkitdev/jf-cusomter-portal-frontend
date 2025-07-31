import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PublicLayoutComponent } from './layout.component';

@NgModule({
  declarations: [PublicLayoutComponent],
  imports: [CommonModule],
  exports: [PublicLayoutComponent]
})
export class PublicLayoutModule {}
