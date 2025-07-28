import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SiteSortField } from '@shared/site';
import { Observable } from 'rxjs';
import { AccountSitesPageFacade } from '../../../sites.facade';
import { AccountSitesQueryParameters } from '../../models';

@Component({
    selector: 'sites-items-header',
    templateUrl: 'items-header.html',
    styleUrls: ['items-header.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountSitesItemsHeaderComponent {
  public parameters$: Observable<AccountSitesQueryParameters>;
  public siteSortField: typeof SiteSortField;

  constructor(
    private facade: AccountSitesPageFacade
  ) {
    this.parameters$ = this.facade.parameters$;
    this.siteSortField = SiteSortField;
  }

  public sortChanged(parameters: AccountSitesQueryParameters): void {
    this.facade.changeSort(parameters);
  }
}
