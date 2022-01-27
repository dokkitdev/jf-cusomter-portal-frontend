import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountSiteContactsComponentFacade } from '../../site-contacts.facade';
import { heightCollapseAnimation } from '@shared/animations';
import { Contact } from '@shared/contact';

@Component({
  selector: 'account-site-contacts-items',
  templateUrl: 'items.html',
  styleUrls: ['items.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightCollapseAnimation]
})
export class AccountSiteContactsItemsComponent {
  public items$: Observable<Array<Contact>>;

  constructor(
    private facade: AccountSiteContactsComponentFacade
  ) {
    this.items$ = this.facade.sortedItems$;
  }

  public itemDeleted(id: number): void {
    this.facade.deleteItem(id);
  }
}
