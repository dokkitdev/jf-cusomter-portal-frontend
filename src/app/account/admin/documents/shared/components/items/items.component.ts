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
  public isLoading$: Observable<boolean>;
  public perPage$: Observable<number>;
  public currentPage$: Observable<number>;
  public totalItems$: Observable<number>;
  public paginationId$: Observable<string>;
  public hasPagination$: Observable<boolean>;

  constructor(
    private facade: AccountAdminDocumentsPageFacade
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

  public itemDeleted(id: number): void {
    this.facade.deleteItem(id);
  }
}
