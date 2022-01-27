import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountSiteContactsComponentFacade } from '../../site-contacts.facade';

@Component({
  selector: 'account-site-contacts-header',
  templateUrl: 'header.html',
  styleUrls: ['header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSiteContactsHeaderComponent {
  constructor(
    private facade: AccountSiteContactsComponentFacade
  ) { }

  public createContactButtonClicked(): void {
    this.facade.createItem();
  }
}
