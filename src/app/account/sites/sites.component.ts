import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AccountSitesPageFacade } from './sites.facade';

@Component({
  selector: 'account-sites-page',
  templateUrl: 'sites.html',
  styleUrls: ['sites.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSitesPageComponent implements OnInit, OnDestroy {
  constructor(
    private facade: AccountSitesPageFacade
  ) { }

  public ngOnInit(): void {
    this.facade.loadItems();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
