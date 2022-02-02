import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AccountSitesViewPageState } from './view.state';
import { Router } from '@angular/router';
import { Site, SiteRelationType, SiteService } from '@shared/site';
import { exhaustMap, filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { NavigationSelectors, NavigationService } from '@shared/navigation';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { DialogService } from '@shared/dialog';
import {
  Actions,
  disable,
  enable,
  formGroupReducer,
  FormGroupState,
  setValue,
  updateGroup,
  validate
} from 'ngrx-forms';
import { trimmedRequired } from '@shared/validators';
import { AccountSiteViewEditForm } from './shared/forms';
import { NotificationService } from '@shared/notification';
import { TranslateService } from '@ngx-translate/core';
import { CustomSelectOption } from '@shared/custom-select';
import { Contact } from '@shared/contact';
import { findIndex } from 'lodash';
import { User, UserService } from '@shared/user';

@Injectable()
export class AccountSitesViewPageFacade {
  public get profile$(): Observable<User> {
    return this.userService.profile$;
  }

  public get formState$(): Observable<FormGroupState<AccountSiteViewEditForm>> {
    return this.componentStore.select((state) => state.formState);
  }

  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get isSubmitting$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isSubmitting);
  }

  public get site$(): Observable<Site> {
    return this.componentStore.select((state) => state.site);
  }

  public get contacts$(): Observable<Array<Contact>> {
    return this.componentStore.select((state) => state.contacts);
  }

  public get contactOptions$(): Observable<Array<CustomSelectOption>> {
    return this.componentStore.select((state) => state.contacts.map((contact) =>
      new CustomSelectOption({
        id: contact.id,
        title: contact.fullName
      })
    ));
  }

  public get relations$(): Observable<Array<SiteRelationType>> {
    return this.componentStore.select((state) => state.relations);
  }

  private initPageEffect$: () => Observable<void>;
  private saveChangesEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountSitesViewPageState>,
    private readonly store: Store<AppState>,
    private readonly router: Router,
    private readonly siteService: SiteService,
    private readonly dialogService: DialogService,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService,
    private readonly navigationService: NavigationService,
    private readonly userService: UserService
  ) {
    this.resetState();

    this.registerInitPageEffect();
    this.registerSaveChangesEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountSitesViewPageState());
  }

  public initPage(): void {
    this.initPageEffect$();
  }

  public back(): void {
    this.navigationService.back('/account/sites');
  }

  public redirectToSitesPage(): void {
    this.router.navigate(['/account/sites']);
  }

  public handleFormStateAction(action: Actions<any>): void {
    this.updateFormState(action);

    this.validateForm();
  }

  public saveChanges(): void {
    this.saveChangesEffect$();
  }

  public addContact(contact: Contact): void {
    this.addCreatedContact(contact);
  }

  public changeContact(contact: Contact): void {
    this.updateChangedContact(contact);
  }

  public removeContact(id: number): void {
    this.removeContactFromState(id);
  }

  private validateForm(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        formState: updateGroup<AccountSiteViewEditForm>(
          state.formState,
          {
            name: validate(trimmedRequired)
          }
        )
      })
    )();
  }

  private toggleDisablingForm(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        formState: (value)
          ? disable(state.formState)
          : enable(state.formState)
      })
    )();
  }

  private disableNotEditableControls(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        formState: updateGroup<AccountSiteViewEditForm>(
          state.formState,
          {
            customerName: (control) => disable(control)
          }
        )
      })
    )();
  }

  private updateFormState(action: Actions<any>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        formState: formGroupReducer(state.formState, action)
      })
    )();
  }

  private updateIsLoading(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isLoading: value
      })
    )();
  }

  private updateIsSubmitting(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isSubmitting: value
      })
    )();
  }

  private updateSite(site: Site): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        site,
        contacts: site.contacts || [],
        formState: updateGroup<AccountSiteViewEditForm>(
          state.formState,
          {
            uprn: setValue(site.uprn || ''),
            name: setValue(site.name || ''),
            address: setValue(site.address || ''),
            postalCode: setValue(site.postalCode || ''),
            city: setValue(site.city || ''),
            county: setValue(site.county || ''),
            primaryContactID: setValue(site.primaryContact?.id),
            customerName: (control) => setValue(control,
              (site.firstCustomer)
                ? this.translateService.instant('ACCOUNT.SITES.VIEW.TEXT_CUSTOMER_NAME', {
                  name: site.firstCustomer.name,
                  id: site.firstCustomer.customerID
                }) as string
                : ''
            )
          }
        )
      })
    )();
  }

  private addCreatedContact(item: Contact): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        contacts: [item, ...state.contacts]
      })
    )();
  }

  private updateChangedContact(item: Contact): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        contacts: (() => {
          const index = findIndex(state.contacts, { id: item.id });

          return (index !== -1)
            ? [...state.contacts.slice(0, index), item, ...state.contacts.slice(index + 1)]
            : state.contacts;
        })()
      })
    )();
  }

  private removeContactFromState(id: number): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        contacts: state.contacts.filter((item) => item.id !== id),
        formState: updateGroup<AccountSiteViewEditForm>(
          state.formState,
          {
            primaryContactID: setValue(
              (state.formState.value.primaryContactID === id)
                ? undefined
                : state.formState.value.primaryContactID
            )
          }
        )
      })
    )();
  }

  private endRequestFailed(errorResponse: unknown): void {
    const errorMessage = (errorResponse as HttpErrorResponse).error.error;

    this.notificationService.error(
      this.translateService.instant(errorMessage || 'ACCOUNT.SITES.VIEW.NOTIFICATIONS.TEXT_ERROR')
    );

    this.updateIsSubmitting(false);
    this.toggleDisablingForm(false);
    this.disableNotEditableControls();
  }

  private registerInitPageEffect(): void {
    this.initPageEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        withLatestFrom(
          this.store.select(NavigationSelectors.selectRouteParam('id')),
          this.relations$
        ),
        switchMap(([_, id, relations]) => {
          this.updateIsLoading(true);

          if (!!id && !!parseInt(id, 10)) {
            return this.tryToLoadData(parseInt(id, 10), relations);
          }

          this.redirectToSitesPage();

          return EMPTY;
        })
      )
    );
  }

  private tryToLoadData(id: number, relations: Array<SiteRelationType>): Observable<Site> {
    return this.siteService
      .get(id, relations)
      .pipe(
        tapResponse(
          (response) => {
            this.updateSite(response);
            this.disableNotEditableControls();
            this.updateIsLoading(false);
          },
          (response) => {
            this.updateIsLoading(false);

            if ((response as HttpErrorResponse).status === HttpStatusCode.NotFound) {
              this.redirectToSitesPage();
            }
          }
        )
      );
  }

  private registerSaveChangesEffect(): void {
    this.saveChangesEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        withLatestFrom(
          this.formState$,
          this.site$
        ),
        filter(([_, formState]) => formState.isValid),
        exhaustMap(([_, formState, site]) => {
          this.updateIsSubmitting(true);
          this.toggleDisablingForm(true);

          const changedSite = new Site({
            ...formState.value,
            id: site.id
          });

          return this.tryToUpdateSite(changedSite);
        })
      )
    );
  }

  private tryToUpdateSite(site: Site): Observable<void> {
    return this.siteService
      .update(site)
      .pipe(
        tapResponse(
          () => {
            this.updateIsSubmitting(false);
            this.toggleDisablingForm(false);
            this.disableNotEditableControls();

            this.notificationService.success(
              this.translateService.instant('ACCOUNT.SITES.VIEW.NOTIFICATIONS.TEXT_SITE_UPDATED')
            );
          },
          (errorResponse) => this.endRequestFailed(errorResponse)
        )
      );
  }
}
