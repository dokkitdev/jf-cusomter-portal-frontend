import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pagination-elements',
  templateUrl: 'pagination-elements.html',
  styleUrls: ['pagination-elements.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class PaginationElementsComponent {
  @Input() paginationId: number;

  @Output() pageChanged: EventEmitter<number>;

  constructor() {
    this.pageChanged = new EventEmitter();
  }
}
