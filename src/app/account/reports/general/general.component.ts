import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AccountReportsGeneralPageFacade } from './general.facade';
import { CsvReport } from './shared/models/csv-report';
import { map, Observable } from 'rxjs';
import { heightCollapseAnimation } from '@shared/animations';

@Component({
  selector: 'account-reports-general-page',
  templateUrl: 'general.html',
  styleUrls: ['general.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightCollapseAnimation],
  standalone: false
})
export class AccountReportsGeneralComponent implements OnInit, OnDestroy {
  public items$: Observable<Array<CsvReport>>;
  public isLoading$: Observable<boolean>;
  public perPage$: Observable<number>;
  public currentPage$: Observable<number>;
  public totalItems$: Observable<number>;
  public hasPagination$: Observable<boolean>;
  public paginationID$: Observable<string>;
  public sortParameters$: Observable<any>;

  constructor(public facade: AccountReportsGeneralPageFacade) {
    this.items$ = this.facade.items$;
    this.isLoading$ = this.facade.isLoading$;
    this.perPage$ = this.facade.perPage$;
    this.currentPage$ = this.facade.currentPage$;
    this.totalItems$ = this.facade.totalItems$;
    this.hasPagination$ = this.facade.hasPagination$;
    this.paginationID$ = this.facade.paginationID$;
    this.sortParameters$ = this.facade.sortParameters$;
  }

  public ngOnInit(): void {
    this.facade.loadItems();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public onDownloadClicked(item: CsvReport): void {
    this.facade.onDownloadClicked(item);
  }

  public onPageChanged(page: number): void {
    this.facade.loadItemsByPage(page);
  }

  public onSortChanged(event: any): void {
    this.facade.onSortChanged(event);
  }
}
