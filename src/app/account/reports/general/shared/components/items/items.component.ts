import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountReportsGeneralPageFacade } from '../../../general.facade';
import { CsvReport } from '../../models/csv-report';
import { Observable } from 'rxjs';
import { heightCollapseAnimation } from '@shared/animations';

@Component({
  selector: 'reports-general-items',
  templateUrl: 'items.html',
  styleUrls: ['items.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightCollapseAnimation],
  standalone: false
})
export class AccountReportsGeneralItemsComponent {
  public items$: Observable<Array<CsvReport>>;
  public isLoading$: Observable<boolean>;
  public perPage$: Observable<number>;
  public currentPage$: Observable<number>;
  public totalItems$: Observable<number>;
  public hasPagination$: Observable<boolean>;
  public paginationID$: Observable<string>;

  constructor(public facade: AccountReportsGeneralPageFacade) {
    this.items$ = this.facade.items$;
    this.isLoading$ = this.facade.isLoading$;
    this.perPage$ = this.facade.perPage$;
    this.currentPage$ = this.facade.currentPage$;
    this.totalItems$ = this.facade.totalItems$;
    this.hasPagination$ = this.facade.hasPagination$;
    this.paginationID$ = this.facade.paginationID$;
  }

  public onDownloadClicked(item: CsvReport): void {
    this.facade.onDownloadClicked(item);
  }

  public onPageChanged(page: number): void {
    this.facade.loadItemsByPage(page);
  }
}
