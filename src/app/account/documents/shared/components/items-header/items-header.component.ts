import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentSortField } from '@shared/document';
import { Observable } from 'rxjs';
import { AccountDocumentsPageFacade } from '../../../documents.facade';
import { AccountDocumentsQueryParameters } from '../../models';

@Component({
    selector: 'documents-items-header',
    templateUrl: 'items-header.html',
    styleUrls: ['items-header.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountDocumentsItemsHeaderComponent {
  public parameters$: Observable<AccountDocumentsQueryParameters>;
  public documentSortField: typeof DocumentSortField;

  constructor(
    private facade: AccountDocumentsPageFacade
  ) {
    this.parameters$ = this.facade.parameters$;
    this.documentSortField = DocumentSortField;
  }

  public sortChanged(parameters: AccountDocumentsQueryParameters): void {
    this.facade.changeSort(parameters);
  }
}
