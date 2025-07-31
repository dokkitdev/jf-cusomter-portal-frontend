import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AccountSitesViewPageFacade } from './view.facade';
import { Observable } from 'rxjs';
import { SpinnerDiameter } from '@shared/loading-spinner';
import { FormGroupState } from 'ngrx-forms';
import { AccountSiteViewEditForm } from './shared/forms';
import { Contact } from '@shared/contact';
import { Site } from '@shared/site';

@Component({
  selector: 'account-sites-view-page',
  templateUrl: 'view.html',
  styleUrls: ['view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountSitesViewPageComponent implements OnInit, OnDestroy {
  public formState$: Observable<FormGroupState<AccountSiteViewEditForm>>;
  public isLoading$: Observable<boolean>;
  public site$: Observable<Site>;
  public contacts$: Observable<Array<Contact>>;
  public spinnerDiameter: typeof SpinnerDiameter;

  constructor(private facade: AccountSitesViewPageFacade) {
    this.formState$ = this.facade.formState$;
    this.isLoading$ = this.facade.isLoading$;
    this.site$ = this.facade.site$;
    this.contacts$ = this.facade.contacts$;
    this.spinnerDiameter = SpinnerDiameter;
  }

  public ngOnInit(): void {
    this.facade.initPage();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public contactCreated(contact: Contact): void {
    this.facade.addContact(contact);
  }

  public contactUpdated(contact: Contact): void {
    this.facade.changeContact(contact);
  }

  public contactDeleted(id: number): void {
    this.facade.removeContact(id);
  }
}
