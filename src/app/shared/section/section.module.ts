import { NgModule } from '@angular/core';
import { SectionComponent } from './section.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SectionComponent],
  imports: [CommonModule, TranslateModule],
  exports: [SectionComponent]
})
export class SectionModule {}
