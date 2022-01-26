import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CustomSelectOption } from '@shared/custom-select';
import { Actions, FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { AccountSitesViewPageFacade } from '../../../view.facade';
import { AccountSiteViewEditForm } from '../../forms';

@Component({
  selector: 'account-sites-view-form',
  templateUrl: 'form.html',
  styleUrls: ['form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSitesViewFormComponent {
  public formState$: Observable<FormGroupState<AccountSiteViewEditForm>>;
  public isSubmitting$: Observable<boolean>;
  public contactOptions$: Observable<Array<CustomSelectOption>>;

  constructor(
    private facade: AccountSitesViewPageFacade
  ) {
    this.formState$ = this.facade.formState$;
    this.isSubmitting$ = this.facade.isSubmitting$;
    this.contactOptions$ = this.facade.contactOptions$;
  }

  public formActionTriggered(action: Actions<any>): void {
    this.facade.handleFormStateAction(action);
  }

  public formSubmitted(): void {
    this.facade.saveChanges();
  }
}
