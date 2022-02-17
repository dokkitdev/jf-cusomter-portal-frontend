import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AccountAssetsPageFacade } from './assets.facade';

@Component({
  selector: 'account-assets-page',
  templateUrl: 'assets.html',
  styleUrls: ['assets.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAssetsPageComponent implements OnInit, OnDestroy {
  constructor(
    private facade: AccountAssetsPageFacade
  ) { }

  public ngOnInit(): void {
    this.facade.loadItems();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
