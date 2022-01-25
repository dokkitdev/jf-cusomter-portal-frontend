import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'header-sort',
  templateUrl: 'header-sort.html',
  styleUrls: ['header-sort.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderSortComponent {
  @Input() orderBy: string;
  @Input() parameters: { orderBy: string; desc: boolean };

  @Output() sortChanged: EventEmitter<{ orderBy: string; desc: boolean }> = new EventEmitter();

  public changeSort(): void {
    const desc = (this.orderBy === this.parameters.orderBy) ? !this.parameters.desc : false;

    this.sortChanged.emit({ orderBy: this.orderBy, desc });
  }
}
