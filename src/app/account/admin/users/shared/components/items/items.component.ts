import { AccountAdminUsersPageFacade } from './../../../users.facade';
import { User } from '@shared/user';
import { Observable } from 'rxjs';
import { SpinnerDiameter } from '@shared/loading-spinner';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'admin-users-items',
  templateUrl: 'items.html',
  styleUrls: ['items.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAdminUsersItemsComponent {
  public items$: Observable<Array<User>>;
  public hasMoreItems$: Observable<boolean>;
  public isLoading$: Observable<boolean>;
  public isLoadingToPage$: Observable<boolean>;

  constructor(
    private facade: AccountAdminUsersPageFacade
  ) {
    // this.items$ = this.facade.items$;
    // this.hasMoreItems$ = this.facade.hasMoreItems$;
    // this.isLoading$ = this.facade.isLoading$;
    // this.isLoadingToPage$ = this.facade.isLoadingToPage$;
  }

  public loadNextPageClicked(): void {
    // this.facade.loadNextPage();
  }

  public itemDeleted(id: number): void {
    // this.facade.deleteItem(id);
  }
}
