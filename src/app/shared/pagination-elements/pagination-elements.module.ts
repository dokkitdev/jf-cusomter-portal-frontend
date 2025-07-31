import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationElementsComponent } from './pagination-elements.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PaginationElementsComponent],
  imports: [CommonModule, TranslateModule, NgxPaginationModule],
  exports: [PaginationElementsComponent]
})
export class PaginationElementsModule {}
