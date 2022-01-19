import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { FilterValuesFacade } from './filter-values.facade';
import { FilterValue } from './models';
import { Subject } from 'rxjs';

@Component({
  selector: 'filter-values',
  templateUrl: 'filter-values.html',
  styleUrls: ['filter-values.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterValuesComponent {
  @Input() items: Array<FilterValue>;

  @Output() filterRemoved: Subject<FilterValue>;

  constructor(
    private facade: FilterValuesFacade
  ) {
    this.filterRemoved = this.facade.filterRemovedSubject;
  }
}
