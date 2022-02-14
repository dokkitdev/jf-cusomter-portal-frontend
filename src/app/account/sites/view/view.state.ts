import { Contact } from '@shared/contact';
import { Site, SiteRelationType } from '@shared/site';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AccountSiteViewEditForm } from './shared/forms';

export class AccountSitesViewPageState {
  public isLoading: boolean;
  public isSubmitting: boolean;
  public site: Site;
  public contacts: Array<Contact>;
  public relations: Array<SiteRelationType>;
  public formState: FormGroupState<AccountSiteViewEditForm>;

  constructor() {
    this.isLoading = false;
    this.isSubmitting = false;
    this.site = new Site();
    this.contacts = [];
    this.relations = ['customer', 'site_contacts', 'primary_site_contact'];
    this.formState = createFormGroupState('AccountSiteViewEditForm', new AccountSiteViewEditForm());
  }
}
