import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountAdminDocumentsPageFacade } from '../../../documents.facade';

@Component({
  selector: 'admin-documents-header',
  templateUrl: 'header.html',
  styleUrls: ['header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAdminDocumentsHeaderComponent {
  constructor(
    private facade: AccountAdminDocumentsPageFacade
  ) { }

  public newDocumentButtonClicked(): void {
    this.facade.openAddDocumentDialog();
  }
}
