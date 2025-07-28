import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AssetSortField } from '@shared/asset';
import { Observable } from 'rxjs';
import { AccountAssetsPageFacade } from '../../../assets.facade';
import { AccountAssetsQueryParameters } from '../../models';

@Component({
    selector: 'assets-items-header',
    templateUrl: 'items-header.html',
    styleUrls: ['items-header.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountAssetsItemsHeaderComponent {
  public parameters$: Observable<AccountAssetsQueryParameters>;
  public assetSortField: typeof AssetSortField;

  constructor(
    private facade: AccountAssetsPageFacade
  ) {
    this.parameters$ = this.facade.parameters$;
    this.assetSortField = AssetSortField;
  }

  public sortChanged(parameters: AccountAssetsQueryParameters): void {
    this.facade.changeSort(parameters);
  }
}
