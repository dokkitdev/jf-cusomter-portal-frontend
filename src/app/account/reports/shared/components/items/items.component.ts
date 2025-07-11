import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountReportsPageFacade } from '@app/account/reports/reports.facade';
import { Report } from '@shared/report';
import { Observable } from 'rxjs';
import { heightCollapseAnimation } from '@shared/animations';

@Component({
  selector: 'reports-items',
  templateUrl: 'items.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightCollapseAnimation]
})
export class AccountReportsItemsComponent {
  public items$: Observable<Array<Report>>;
  public isLoading$: Observable<boolean>;
  public perPage$: Observable<number>;
  public currentPage$: Observable<number>;
  public totalItems$: Observable<number>;
  public paginationId$: Observable<string>;
  public hasPagination$: Observable<boolean>;

  constructor(
    private facade: AccountReportsPageFacade
  ) {
    this.items$ = this.facade.items$;
    this.isLoading$ = this.facade.isLoading$;
    this.perPage$ = this.facade.perPage$;
    this.currentPage$ = this.facade.currentPage$;
    this.totalItems$ = this.facade.totalItems$;
    this.paginationId$ = this.facade.paginationId$;
    this.hasPagination$ = this.facade.hasPagination$;
  }

  public pageChanged(page: number): void {
    this.facade.loadItemsByPage(page);
  }
}
