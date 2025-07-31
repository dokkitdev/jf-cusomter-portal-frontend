import { CommonModule } from '@angular/common';
import { FilterValuesComponent } from './filter-values.component';
import { NgModule } from '@angular/core';
import { FilterValuesItemComponent } from './components/item/item.component';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { FilterValuesFacade } from './filter-values.facade';

@NgModule({
  declarations: [FilterValuesComponent, FilterValuesItemComponent],
  imports: [CommonModule, NgForTrackByPropertyModule],
  exports: [FilterValuesComponent],
  providers: [FilterValuesFacade]
})
export class FilterValuesModule {}
