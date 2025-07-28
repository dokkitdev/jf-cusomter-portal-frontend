import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AccountAdminDocumentsPageFacade } from './documents.facade';

@Component({
    selector: 'account-admin-documents-page',
    templateUrl: 'documents.html',
    styleUrls: ['documents.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountAdminDocumentsPageComponent implements OnInit, OnDestroy {
  constructor(
    private facade: AccountAdminDocumentsPageFacade
  ) { }

  public ngOnInit(): void {
    this.facade.loadItems();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
