import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableContainerComponent } from './table-container.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TableContainerComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    TableContainerComponent
  ]
})
export class TableContainerModule { }
