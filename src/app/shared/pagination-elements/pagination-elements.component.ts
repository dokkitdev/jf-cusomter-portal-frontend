import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination-elements',
  templateUrl: 'pagination-elements.html',
  styleUrls: ['pagination-elements.scss']
})
export class PaginationElementsComponent {
  @Input() paginationId: number;

  @Output() pageChanged: EventEmitter<number>;

  constructor() {
    this.pageChanged = new EventEmitter();
  }
}
