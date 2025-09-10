import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountReportsAssetPageFacade } from '@app/account/reports/asset/asset.facade';
import { AssetReportItem } from '@app/account/reports/asset/asset.state';

@Component({
  selector: 'account-reports-asset-table',
  templateUrl: 'table.html',
  styleUrls: ['table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountReportsAssetTableComponent {
  public items$: Observable<AssetReportItem[]>;
  public isLoading$: Observable<boolean>;
  public perPage$: Observable<number>;
  public currentPage$: Observable<number>;
  public totalItems$: Observable<number>;
  public hasPagination$: Observable<boolean>;
  public paginationID$: Observable<string>;
  public orderBy$: Observable<string>;
  public desc$: Observable<boolean>;
  public parameters$: Observable<any>;

  constructor(private facade: AccountReportsAssetPageFacade) {
    this.items$ = this.facade.items$;
    this.isLoading$ = this.facade.isLoading$;
    this.perPage$ = this.facade.perPage$;
    this.currentPage$ = this.facade.currentPage$;
    this.totalItems$ = this.facade.totalItems$;
    this.hasPagination$ = this.facade.hasPagination$;
    this.paginationID$ = this.facade.paginationID$;
    this.orderBy$ = this.facade.orderBy$;
    this.desc$ = this.facade.desc$;
    this.parameters$ = this.facade.parameters$;
  }

  public onPageChanged(page: number): void {
    this.facade.changePage(page);
  }

  public onSortChanged(field: string): void {
    this.facade.changeSort(field);
  }

  public trackByAssetId(index: number, item: AssetReportItem): string {
    return item.assetId;
  }
}
