import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountProfilePageFacade } from '@app/account/profile/profile.facade';
import { heightCollapseAnimation } from '@shared/animations';
import { Actions, FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { AccountProfilePageForm } from '../../forms';

@Component({
    selector: 'account-profile-form',
    templateUrl: 'form.html',
    styleUrls: ['form.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [heightCollapseAnimation],
    standalone: false
})
export class AccountProfileFormComponent {
  public isSubmitting$: Observable<boolean>;
  public isPasswordBlockVisible$: Observable<boolean>;
  public formState$: Observable<FormGroupState<AccountProfilePageForm>>;

  constructor(
    private facade: AccountProfilePageFacade
  ) {
    this.isSubmitting$ = this.facade.isSubmitting$;
    this.isPasswordBlockVisible$ = this.facade.isPasswordBlockVisible$;
    this.formState$ = this.facade.formState$;
  }

  public formSubmitted(): void {
    this.facade.saveChanges();
  }

  public formActionTriggered(action: Actions<any>): void {
    this.facade.handleFormStateAction(action);
  }

  public passwordBlockVisibilityToggleClicked(isVisible: boolean): void {
    this.facade.togglePasswordBlockVisibility(isVisible);
  }
}
