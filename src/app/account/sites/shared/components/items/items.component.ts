import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountSitesPageFacade } from '../../../sites.facade';
import { Site } from '@shared/site';
import { Observable } from 'rxjs';
import { heightCollapseAnimation } from '@shared/animations';

@Component({
  selector: 'account-sites-items',
  templateUrl: 'items.html',
  styleUrls: ['items.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightCollapseAnimation]
})
export class AccountSitesItemsComponent {
  public items$: Observable<Array<Site>>;
  public hasMoreItems$: Observable<boolean>;
  public isLoading$: Observable<boolean>;
  public isLoadingToPage$: Observable<boolean>;

  constructor(
    private facade: AccountSitesPageFacade
  ) {
    this.items$ = this.facade.items$;
    this.hasMoreItems$ = this.facade.hasMoreItems$;
    this.isLoading$ = this.facade.isLoading$;
    this.isLoadingToPage$ = this.facade.isLoadingToPage$;
  }
}
