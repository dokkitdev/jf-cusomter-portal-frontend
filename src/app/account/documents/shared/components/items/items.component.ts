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
    animations: [heightCollapseAnimation],
    standalone: false
})
export class AccountDocumentsItemsComponent {
  public items$: Observable<Array<Document>>;
  public isLoading$: Observable<boolean>;
  public perPage$: Observable<number>;
  public currentPage$: Observable<number>;
  public totalItems$: Observable<number>;
  public paginationId$: Observable<string>;
  public hasPagination$: Observable<boolean>;

  constructor(
    private facade: AccountDocumentsPageFacade
  ) {
    this.items$ = this.facade.items$;
    this.isLoading$ = this.facade.isLoading$;
    this.perPage$ = this.facade.perPage$;
    this.currentPage$ = this.facade.currentPage$;
    this.totalItems$ = this.facade.totalItems$;
    this.paginationId$ = this.facade.paginationId$;
    this.hasPagination$ = this.facade.hasPagination$;
  }

  public pageChanged(page: number): void {
    this.facade.loadItemsByPage(page);
  }
}
