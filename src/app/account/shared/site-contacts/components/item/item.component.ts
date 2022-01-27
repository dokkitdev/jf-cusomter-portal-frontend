import { Component, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Contact } from '@shared/contact';
import { SpinnerDiameter } from '@shared/loading-spinner';
import { Observable, Subject } from 'rxjs';
import { AccountSiteContactsItemComponentFacade } from './item.facade';

@Component({
  selector: 'account-site-contacts-item',
  templateUrl: 'item.html',
  styleUrls: ['item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AccountSiteContactsItemComponentFacade,
    ComponentStore
  ]
})
export class AccountSiteContactsItemComponent {
  @Input() item: Contact;

  @Output() deletingSuccess: Subject<number>;

  public isSendingRequest$: Observable<boolean>;
  public spinnerDiameter: typeof SpinnerDiameter;

  constructor(
    private facade: AccountSiteContactsItemComponentFacade
  ) {
    this.isSendingRequest$ = this.facade.isSendingRequest$;
    this.deletingSuccess = this.facade.deletingSuccessSubject;
    this.spinnerDiameter = SpinnerDiameter;
  }

  public editButtonClicked(): void {
    this.facade.editItem(this.item);
  }

  public deleteButtonClicked(): void {
    this.facade.deleteItem(this.item.id);
  }
}
