import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountLeftSidebarFacade } from './left-sidebar.facade';
import { User } from '@shared/user/models';
import { heightCollapseAnimation } from '@shared/animations';
import { AssetType } from '@shared/asset';

@Component({
  selector: 'account-left-sidebar',
  templateUrl: 'left-sidebar.html',
  styleUrls: ['left-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightCollapseAnimation]
})
export class AccountLeftSidebarComponent implements OnDestroy {
  public profile$: Observable<User>;
  public isAdmin$: Observable<boolean>;
  public isAdminMenuOpened$: Observable<boolean>;
  public isAdminMenuItemActive$: Observable<boolean>;
  public assetType: typeof AssetType;

  constructor(
    private facade: AccountLeftSidebarFacade
  ) {
    this.profile$ = this.facade.profile$;
    this.isAdmin$ = this.facade.isAdmin$;
    this.isAdminMenuOpened$ = this.facade.isAdminMenuOpened$;
    this.isAdminMenuItemActive$ = this.facade.isAdminMenuItemActive$;
    this.assetType = AssetType;
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public toggleAdminMenu(): void {
    this.facade.toggleAdminMenu();
  }

  public logout(): void {
    this.facade.logout();
  }
}
