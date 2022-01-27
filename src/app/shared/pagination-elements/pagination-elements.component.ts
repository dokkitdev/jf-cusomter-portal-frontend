import { Component, Input } from '@angular/core';

@Component({
  selector: 'pagination-elements',
  templateUrl: 'pagination-elements.html',
  styleUrls: ['pagination-elements.scss']
})
export class PaginationElementsComponent {
  @Input() paginationId: number;
}
