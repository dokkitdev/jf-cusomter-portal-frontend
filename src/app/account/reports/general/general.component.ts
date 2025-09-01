import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AccountReportsGeneralPageFacade } from './general.facade';
import { CsvReport } from './shared/models/csv-report';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'account-reports-general-page',
  templateUrl: 'general.html',
  styleUrls: ['general.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountReportsGeneralComponent implements OnInit, OnDestroy {
  public hasPagination$: Observable<boolean>;

  constructor(public facade: AccountReportsGeneralPageFacade) {
    this.hasPagination$ = this.facade.totalPages$.pipe(map((totalPages) => totalPages > 1));
  }

  public ngOnInit(): void {
    this.facade.loadItems();
  }

  public ngOnDestroy(): void {
    // TODO: Add cleanup logic
  }

  public onSortChanged(event: any): void {
    // TODO: Implement sorting logic
  }

  public onDownloadClicked(item: CsvReport): void {
    this.facade.onDownloadClicked(item);
  }

  public onPageChanged(page: number): void {
    // TODO: Implement page change logic
  }
}
