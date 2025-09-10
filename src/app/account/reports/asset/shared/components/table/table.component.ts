import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountReportsAssetPageFacade } from '@app/account/reports/asset/asset.facade';
import { AssetReportItem } from '@shared/notify';
import { AssetReportSortField } from '@shared/notify/types';
import { HeaderSortParameters } from '@shared/header-sort';

@Component({
  selector: 'account-reports-asset-table',
  templateUrl: 'table.html',
  styleUrls: ['table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountReportsAssetTableComponent {
  public items$: Observable<Array<AssetReportItem>>;
  public isLoading$: Observable<boolean>;
  public perPage$: Observable<number>;
  public currentPage$: Observable<number>;
  public totalItems$: Observable<number>;
  public hasPagination$: Observable<boolean>;
  public paginationID$: Observable<string>;
  public orderBy$: Observable<AssetReportSortField>;
  public desc$: Observable<boolean>;
  public parameters$: Observable<any>;
  public sortField = AssetReportSortField;

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

  public onSortChanged(parameters: HeaderSortParameters): void {
    this.facade.changeSort(parameters.orderBy as AssetReportSortField);
  }

  public trackByAssetId(index: number, item: AssetReportItem): number {
    return item.id;
  }
}
