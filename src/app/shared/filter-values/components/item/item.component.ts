import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FilterValuesFacade } from '../../filter-values.facade';
import { FilterValue } from '../../models';

@Component({
  selector: 'filter-values-item',
  templateUrl: 'item.html',
  styleUrls: ['item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterValuesItemComponent {
  @Input() item: FilterValue;

  constructor(
    private facade: FilterValuesFacade
  ) { }

  public removeFilterClicked(): void {
    this.facade.removeItem(this.item);
  }
}
