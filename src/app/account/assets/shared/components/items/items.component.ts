import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountAssetsPageFacade } from '@app/account/assets/assets.facade';
import { Asset } from '@shared/asset';
import { Observable } from 'rxjs';
import { heightCollapseAnimation } from '@shared/animations';

@Component({
  selector: 'assets-items',
  templateUrl: 'items.html',
  styleUrls: ['items.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightCollapseAnimation]
})
export class AccountAssetsItemsComponent {
  public items$: Observable<Array<Asset>>;
  public isLoading$: Observable<boolean>;
  public perPage$: Observable<number>;
  public currentPage$: Observable<number>;
  public totalItems$: Observable<number>;
  public hasPagination$: Observable<boolean>;
  public paginationID$: Observable<string>;

  constructor(
    private facade: AccountAssetsPageFacade
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
