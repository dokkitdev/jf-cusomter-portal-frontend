import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentSortField } from '@shared/document';
import { Observable } from 'rxjs';
import { AccountAdminDocumentsPageFacade } from '../../../documents.facade';
import { AccountAdminDocumentsQueryParameters } from '../../models';

@Component({
  selector: 'admin-documents-items-header',
  templateUrl: 'items-header.html',
  styleUrls: ['items-header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAdminDocumentsItemsHeaderComponent {
  public parameters$: Observable<AccountAdminDocumentsQueryParameters>;
  public documentSortField: typeof DocumentSortField;

  constructor(
    private facade: AccountAdminDocumentsPageFacade
  ) {
    this.parameters$ = this.facade.parameters$;
    this.documentSortField = DocumentSortField;
  }

  public sortChanged(parameters: AccountAdminDocumentsQueryParameters): void {
    this.facade.changeSort(parameters);
  }
}
