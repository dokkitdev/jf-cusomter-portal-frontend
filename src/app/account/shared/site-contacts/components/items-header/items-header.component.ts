import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountSiteContactsComponentFacade } from '../../site-contacts.facade';
import { AccountSiteContactsQueryParameters } from '../../models';
import { SiteContactSortField } from '../../enums';

@Component({
  selector: 'account-site-contacts-items-header',
  templateUrl: 'items-header.html',
  styleUrls: ['items-header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountSiteContactsItemsHeaderComponent {
  public parameters$: Observable<AccountSiteContactsQueryParameters>;
  public siteContactSortField: typeof SiteContactSortField;

  constructor(private facade: AccountSiteContactsComponentFacade) {
    this.parameters$ = this.facade.parameters$;
    this.siteContactSortField = SiteContactSortField;
  }

  public sortChanged(parameters: AccountSiteContactsQueryParameters): void {
    this.facade.changeSort(parameters);
  }
}
