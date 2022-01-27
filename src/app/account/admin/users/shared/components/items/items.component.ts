import { heightCollapseAnimation } from './../../../../../../shared/animations/height-collapse.animation';
import { AccountAdminUsersPageFacade } from './../../../users.facade';
import { User } from '@shared/user';
import { Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'admin-users-items',
  templateUrl: 'items.html',
  styleUrls: ['items.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightCollapseAnimation]
})
export class AccountAdminUsersItemsComponent {
  public items$: Observable<Array<User>>;
  public hasMoreItems$: Observable<boolean>;
  public isLoading$: Observable<boolean>;
  public isLoadingToPage$: Observable<boolean>;
  public perPage$: Observable<number>;
  public currentPage$: Observable<number>;
  public totalItems$: Observable<number>;
  public paginationId$: Observable<string>;

  constructor(
    private facade: AccountAdminUsersPageFacade
  ) {
    this.items$ = this.facade.items$;
    this.hasMoreItems$ = this.facade.hasMoreItems$;
    this.isLoading$ = this.facade.isLoading$;
    this.isLoadingToPage$ = this.facade.isLoadingToPage$;
    this.perPage$ = this.facade.perPage$;
    this.currentPage$ = this.facade.currentPage$;
    this.totalItems$ = this.facade.totalItems$;
    this.paginationId$ = this.facade.paginationId$;
  }

  public itemDeleted(id: number): void {
    this.facade.deleteItem(id);
  }

  public pageChanged(page: number): void {
    this.facade.loadItemsByPage(page);
  }
}
