import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AccountReportsAssetPageFacade } from './asset.facade';

@Component({
  selector: 'account-reports-asset-page',
  templateUrl: 'asset.html',
  styleUrls: ['asset.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountReportsAssetPageComponent implements OnInit, OnDestroy {
  constructor(public facade: AccountReportsAssetPageFacade) {}

  public ngOnInit(): void {
    this.facade.loadItems();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
