import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Contact } from '@shared/contact';
import { orderBy } from 'lodash';
import { Observable, Subject } from 'rxjs';
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

  constructor(
    private readonly componentStore: ComponentStore<AccountSiteContactsComponentState>
  ) {
    this.resetState();
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
}
