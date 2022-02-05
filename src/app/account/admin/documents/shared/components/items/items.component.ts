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

  constructor(
    private facade: AccountAdminDocumentsPageFacade
  ) {
    this.items$ = this.facade.items$;
    this.isLoading$ = this.facade.isLoading$;
  }

  public itemDeleted(id: number): void {
    this.facade.deleteItem(id);
  }
}
