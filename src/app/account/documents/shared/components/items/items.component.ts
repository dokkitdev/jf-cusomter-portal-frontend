import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountDocumentsPageFacade } from '@app/account/documents/documents.facade';
import { Document } from '@shared/document';
import { Observable } from 'rxjs';
import { heightCollapseAnimation } from '@shared/animations';

@Component({
  selector: 'documents-items',
  templateUrl: 'items.html',
  styleUrls: ['items.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightCollapseAnimation]
})
export class AccountDocumentsItemsComponent {
  public items$: Observable<Array<Document>>;
  public hasMoreItems$: Observable<boolean>;
  public isLoading$: Observable<boolean>;
  public isLoadingToPage$: Observable<boolean>;

  constructor(
    private facade: AccountDocumentsPageFacade
  ) {
    this.items$ = this.facade.items$;
    this.hasMoreItems$ = this.facade.hasMoreItems$;
    this.isLoading$ = this.facade.isLoading$;
    this.isLoadingToPage$ = this.facade.isLoadingToPage$;
  }

  public loadNextPageClicked(): void {
    this.facade.loadNextPage();
  }
}
