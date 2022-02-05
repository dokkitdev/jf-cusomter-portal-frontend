import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Document } from '@shared/document';
import { Observable } from 'rxjs';
import { AccountAdminDocumentsPageFacade } from '../../../documents.facade';
import { heightCollapseAnimation } from '@shared/animations';

@Component({
  selector: 'admin-documents-items',
  templateUrl: 'items.html',
  styleUrls: ['items.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightCollapseAnimation]
})
export class AccountAdminDocumentsItemsComponent {
  public items$: Observable<Array<Document>>;
  public hasMoreItems$: Observable<boolean>;
  public isLoading$: Observable<boolean>;
  public isLoadingToPage$: Observable<boolean>;

  constructor(
    private facade: AccountAdminDocumentsPageFacade
  ) {
    this.items$ = this.facade.items$;
    this.hasMoreItems$ = this.facade.hasMoreItems$;
    this.isLoading$ = this.facade.isLoading$;
    this.isLoadingToPage$ = this.facade.isLoadingToPage$;
  }

  public loadNextPageClicked(): void {
    this.facade.loadNextPage();
  }

  public itemDeleted(id: number): void {
    this.facade.deleteItem(id);
  }
}
