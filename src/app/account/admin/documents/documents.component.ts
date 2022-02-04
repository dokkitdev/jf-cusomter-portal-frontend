import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountAdminDocumentsPageFacade } from './documents.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'account-admin-documents-page',
  templateUrl: 'documents.html',
  styleUrls: ['documents.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAdminDocumentsPageComponent {
  constructor(
    private facade: AccountAdminDocumentsPageFacade
  ) {}
}
