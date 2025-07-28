import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { HeaderSortParameters } from './models';

@Component({
    selector: 'header-sort',
    templateUrl: 'header-sort.html',
    styleUrls: ['header-sort.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HeaderSortComponent {
  @Input() orderBy: string;
  @Input() parameters: HeaderSortParameters;

  @Output() sortChanged: EventEmitter<HeaderSortParameters>;

  constructor() {
    this.sortChanged = new EventEmitter();
  }

  public changeSortClicked(): void {
    const desc = (this.orderBy === this.parameters.orderBy) ? !this.parameters.desc : false;

    this.sortChanged.emit(new HeaderSortParameters({ orderBy: this.orderBy, desc }));
  }
}
