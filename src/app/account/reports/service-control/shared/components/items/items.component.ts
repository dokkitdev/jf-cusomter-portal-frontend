import { Observable } from 'rxjs';
import { AccountReportsServiceControlFacade } from './../../../service-control.facade';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Asset } from '@shared/asset';
import { heightCollapseAnimation } from '@shared/animations';

@Component({
    selector: 'reports-service-control-items',
    templateUrl: 'items.html',
    styleUrls: ['items.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [heightCollapseAnimation],
    standalone: false
})
export class AccountReportsServiceControlItemsComponent {
  public items$: Observable<Array<Asset>>;
  public isLoading$: Observable<boolean>;
  public perPage$: Observable<number>;
  public currentPage$: Observable<number>;
  public totalItems$: Observable<number>;
  public hasPagination$: Observable<boolean>;
  public paginationID$: Observable<string>;

  constructor(
    private facade: AccountReportsServiceControlFacade
  ) {
    this.items$ = this.facade.items$;
    this.isLoading$ = this.facade.isLoading$;
    this.perPage$ = this.facade.perPage$;
    this.currentPage$ = this.facade.currentPage$;
    this.totalItems$ = this.facade.totalItems$;
    this.hasPagination$ = this.facade.hasPagination$;
    this.paginationID$ = this.facade.paginationID$;
  }

  public pageChanged(page: number): void {
    this.facade.loadItemsByPage(page);
  }
}
