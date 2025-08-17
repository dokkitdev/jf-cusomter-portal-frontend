import { AccountReportsServiceControlFacade } from '../../../ashp-unvented-service-control.facade';
import { AccountReportsServiceControlQueryParameters } from './../../models/query-parameters';
import { Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AssetSortField } from '@shared/asset';

@Component({
  selector: 'reports-service-control-items-header',
  templateUrl: 'items-header.html',
  styleUrls: ['items-header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountReportsASHPUnventedServiceControlItemsHeaderComponent {
  public parameters$: Observable<AccountReportsServiceControlQueryParameters>;
  public assetSortField: typeof AssetSortField;

  constructor(
    private facade: AccountReportsServiceControlFacade
  ) {
    this.parameters$ = this.facade.parameters$;
    this.assetSortField = AssetSortField;
  }

  public sortChanged(parameters: AccountReportsServiceControlQueryParameters): void {
    this.facade.changeSort(parameters);
  }
}
