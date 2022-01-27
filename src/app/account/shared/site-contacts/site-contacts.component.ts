import { Component, ChangeDetectionStrategy, Input, Output, OnDestroy } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Contact } from '@shared/contact';
import { Subject } from 'rxjs';
import { AccountSiteContactsComponentFacade } from './site-contacts.facade';

@Component({
  selector: 'account-site-contacts',
  templateUrl: 'site-contacts.html',
  styleUrls: ['site-contacts.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AccountSiteContactsComponentFacade,
    ComponentStore
  ]
})
export class AccountSiteContactsComponent implements OnDestroy {
  @Input()
  public set siteID(value: number) {
    this.facade.setSiteID(value);
  }
  @Input()
  public set items(value: Array<Contact>) {
    this.facade.setItems(value);
  }

  @Output() contactCreated: Subject<Contact>;
  @Output() contactUpdated: Subject<Contact>;
  @Output() contactDeleted: Subject<number>;

  constructor(
    private facade: AccountSiteContactsComponentFacade
  ) {
    this.contactCreated = this.facade.contactCreatedSubject;
    this.contactUpdated = this.facade.contactUpdatedSubject;
    this.contactDeleted = this.facade.contactDeletedSubject;
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
