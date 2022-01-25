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
  public isLoading$: Observable<boolean>;

  constructor(
    private facade: AccountSitesPageFacade
  ) {
    this.items$ = this.facade.items$;
    this.isLoading$ = this.facade.isLoading$;
  }

  public pageChanged(page: number): void {
    this.facade.loadItemsByParameters(page);
  }
}
