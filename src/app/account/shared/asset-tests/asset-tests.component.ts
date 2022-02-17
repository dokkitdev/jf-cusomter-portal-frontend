import { Component, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AssetTest } from '@shared/asset';
import { AccountAssetTestsComponentFacade } from './asset-tests.facade';

@Component({
  selector: 'account-asset-tests',
  templateUrl: 'asset-tests.html',
  styleUrls: ['asset-tests.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AccountAssetTestsComponentFacade,
    ComponentStore
  ]
})
export class AccountAssetTestsComponent implements OnDestroy {
  @Input()
  public set items(value: Array<AssetTest>) {
    this.facade.setItems(value);
  }

  constructor(
    private facade: AccountAssetTestsComponentFacade
  ) { }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
