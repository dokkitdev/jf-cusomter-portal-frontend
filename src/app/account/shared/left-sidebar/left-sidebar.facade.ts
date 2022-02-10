import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { User, UserService } from '@shared/user';
import { exhaustMap, filter, map, switchMap, tap } from 'rxjs/operators';
import { ComponentStore } from '@ngrx/component-store';
import { AccountLeftSidebarPageState } from './left-sidebar.state';
import { NavigationEnd, Router, Event } from '@angular/router';
import { AuthService } from '@shared/auth';
import { DialogService } from '@shared/dialog';
import { DialogConfirmationComponent, DialogConfirmationConfig } from '@shared/dialog-confirmation';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AccountLeftSidebarFacade {
  public get profile$(): Observable<User> {
    return this.userService.profile$;
  }

  public get isAdmin$(): Observable<boolean> {
    return this.userService.isAdmin$;
  }


  public get isReportsMenuOpened$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isReportsMenuOpened);
  }

  public get isReportsMenuItemActive$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isReportsMenuItemActive);
  }

  public get isAdminMenuOpened$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isAdminMenuOpened);
  }

  public get isAdminMenuItemActive$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isAdminMenuItemActive);
  }

  private logoutEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountLeftSidebarPageState>,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly dialogService: DialogService,
    private readonly translateService: TranslateService,
    private readonly router: Router
  ) {
    this.resetState();
    this.registerSidebarNavigationEffect();
    this.registerLogoutEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountLeftSidebarPageState());
  }

  public toggleReportsMenu(): void {
    this.toggleStateIsReportsMenuOpened();
  }

  public toggleAdminMenu(): void {
    this.toggleStateIsAdminMenuOpened();
  }

  public logout(): void {
    this.logoutEffect$();
  }

  private toggleStateIsReportsMenuOpened(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isReportsMenuOpened: !state.isReportsMenuOpened
      })
    )();
  }

  private updateStateIsReportsMenuItemActive(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isReportsMenuItemActive: value
      })
    )();
  }

  private toggleStateIsAdminMenuOpened(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isAdminMenuOpened: !state.isAdminMenuOpened
      })
    )();
  }

  private updateStateIsAdminMenuItemActive(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isAdminMenuItemActive: value
      })
    )();
  }

  private registerSidebarNavigationEffect(): void {
    this.componentStore.effect(() =>
      this.router.events.pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
        tap((event: NavigationEnd) =>
          this.updateStateIsAdminMenuItemActive(event.url.includes('admin'))
        ),
        tap((event: NavigationEnd) =>
          this.updateStateIsReportsMenuItemActive(event.url.includes('reports'))
        )
      )
    );
  }

  private registerLogoutEffect(): void {
    this.logoutEffect$ = this.componentStore.effect((origin$: Observable<string>) =>
      origin$.pipe(
        map(() => this.dialogService.open(DialogConfirmationComponent, {
          data: new DialogConfirmationConfig({
            title: this.translateService.instant('ACCOUNT.SIDEBAR.DIALOG_LOGOUT.TEXT_TITLE')
          })
        })),
        switchMap((dialogRef) => dialogRef.afterClosed()),
        exhaustMap((result) => {
          if (result) {
            this.authService.unauthorize();
          }

          return EMPTY;
        })
      )
    );
  }
}
