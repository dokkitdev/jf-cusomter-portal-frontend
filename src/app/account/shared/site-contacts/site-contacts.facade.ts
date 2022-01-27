import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Actions, ofType } from '@ngrx/effects';
import { Contact } from '@shared/contact';
import { DialogService } from '@shared/dialog';
import { orderBy } from 'lodash';
import { Observable, Subject } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { AccountDialogEditContactComponent } from '../dialog-edit-contact';
import { AccountDialogEditContactActions } from '../dialog-edit-contact/store';
import { AccountSiteContactsQueryParameters } from './models';
import { AccountSiteContactsComponentState } from './site-contacts.state';

@Injectable()
export class AccountSiteContactsComponentFacade {
  public get sortedItems$(): Observable<Array<Contact>> {
    return this.componentStore.select((state) => orderBy(state.items, state.orderBy, (state.desc) ? 'desc' : 'asc'));
  }

  public get siteID$(): Observable<number | undefined> {
    return this.componentStore.select((state) => state.siteID);
  }

  public get parameters$(): Observable<AccountSiteContactsQueryParameters> {
    return this.componentStore.select((state) => ({
      orderBy: state.orderBy,
      desc: state.desc
    }));
  }

  public contactCreatedSubject: Subject<Contact> = new Subject();
  public contactUpdatedSubject: Subject<Contact> = new Subject();
  public contactDeletedSubject: Subject<number> = new Subject();

  private openCreateContactDialogEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountSiteContactsComponentState>,
    private readonly actions$: Actions,
    private readonly dialogService: DialogService
  ) {
    this.resetState();

    this.registerOpenCreateContactDialogEffect();
    this.registerAddCreatedItemEffect();
    this.registerChangeUpdatedItemEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountSiteContactsComponentState());
  }

  public setSiteID(id: number): void {
    this.updateSiteID(id);
  }

  public setItems(items: Array<Contact>): void {
    this.updateItems(items);
  }

  public createItem(): void {
    this.openCreateContactDialogEffect$();
  }

  public deleteItem(id: number): void {
    this.contactDeletedSubject.next(id);
  }

  public changeSort(parameters: AccountSiteContactsQueryParameters): void {
    this.updateStateSort(parameters);
  }

  private updateSiteID(id: number): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        siteID: id
      })
    )();
  }

  private updateItems(items: Array<Contact>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items
      })
    )();
  }

  private updateStateSort(parameters: AccountSiteContactsQueryParameters): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        orderBy: parameters.orderBy,
        desc: parameters.desc
      })
    )();
  }

  private registerOpenCreateContactDialogEffect(): void {
    this.openCreateContactDialogEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        withLatestFrom(
          this.siteID$
        ),
        map(([_, siteID]) => this.dialogService.open(AccountDialogEditContactComponent, {
          autoFocus: false,
          data: { siteID }
        }))
      )
    );
  }

  private registerAddCreatedItemEffect(): void {
    this.componentStore.effect(() =>
      this.actions$.pipe(
        ofType(AccountDialogEditContactActions.createContactSuccess),
        tap(({ contact }) => this.contactCreatedSubject.next(contact))
      )
    );
  }

  private registerChangeUpdatedItemEffect(): void {
    this.componentStore.effect(() =>
      this.actions$.pipe(
        ofType(AccountDialogEditContactActions.updateContactSuccess),
        tap(({ contact }) => this.contactUpdatedSubject.next(contact))
      )
    );
  }
}
