import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountAssetTestsComponentFacade } from '../../asset-tests.facade';
import { AccountAssetTestsQueryParameters } from '../../models';
import { AssetTestSortField } from '../../enums';

@Component({
  selector: 'asset-tests-items-header',
  templateUrl: 'items-header.html',
  styleUrls: ['items-header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAssetTestsItemsHeaderComponent {
  public parameters$: Observable<AccountAssetTestsQueryParameters>;
  public assetTestSortField: typeof AssetTestSortField;

  constructor(
    private facade: AccountAssetTestsComponentFacade
  ) {
    this.parameters$ = this.facade.parameters$;
    this.assetTestSortField = AssetTestSortField;
  }

  public sortChanged(parameters: AccountAssetTestsQueryParameters): void {
    this.facade.changeSort(parameters);
  }
}
