export class AccountLeftSidebarPageState {
  public isReportsMenuOpened: boolean;
  public isReportsMenuItemActive: boolean;
  public isAdminMenuOpened: boolean;
  public isAdminMenuItemActive: boolean;

  constructor() {
    this.isReportsMenuOpened = false;
    this.isReportsMenuItemActive = false;
    this.isAdminMenuOpened = false;
    this.isAdminMenuItemActive = false;
  }
}
