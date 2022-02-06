import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AccountDocumentsPageFacade } from './documents.facade';

@Component({
  selector: 'account-documents-page',
  templateUrl: 'documents.html',
  styleUrls: ['documents.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountDocumentsPageComponent implements OnInit, OnDestroy {
  constructor(
    private facade: AccountDocumentsPageFacade
  ) { }

  public ngOnInit(): void {
    this.facade.loadItems();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
