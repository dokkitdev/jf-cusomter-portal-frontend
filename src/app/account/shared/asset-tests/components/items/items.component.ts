import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountAssetTestsComponentFacade } from '../../asset-tests.facade';
import { heightCollapseAnimation } from '@shared/animations';
import { AssetTest } from '@shared/asset';

@Component({
  selector: 'asset-tests-items',
  templateUrl: 'items.html',
  styleUrls: ['items.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightCollapseAnimation]
})
export class AccountAssetTestsItemsComponent {
  public items$: Observable<Array<AssetTest>>;

  constructor(
    private facade: AccountAssetTestsComponentFacade
  ) {
    this.items$ = this.facade.sortedItems$;
  }
}
