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

  constructor(
    private facade: AccountAdminUsersPageFacade
  ) {
    this.items$ = this.facade.items$;
    this.hasMoreItems$ = this.facade.hasMoreItems$;
    this.isLoading$ = this.facade.isLoading$;
    this.isLoadingToPage$ = this.facade.isLoadingToPage$;
  }

  public itemDeleted(id: number): void {
    this.facade.deleteItem(id);
  }
}
