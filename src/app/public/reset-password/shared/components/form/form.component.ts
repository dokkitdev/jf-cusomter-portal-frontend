import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PublicResetPasswordPageFacade } from '@app/public/reset-password/reset-password.facade';
import { Actions, FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { PublicResetPasswordPageForm } from '../../forms';

@Component({
    selector: 'reset-password-form',
    templateUrl: 'form.html',
    styleUrls: ['form.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PublicResetPasswordFormComponent {
  public isSubmitting$: Observable<boolean>;
  public isSubmittingFailed$: Observable<boolean>;
  public isTokenChecking$: Observable<boolean>;
  public isInvalidToken$: Observable<boolean>;
  public isNewUser$: Observable<boolean>;
  public formState$: Observable<FormGroupState<PublicResetPasswordPageForm>>;

  constructor(
    private facade: PublicResetPasswordPageFacade
  ) {
    this.isSubmitting$ = this.facade.isSubmitting$;
    this.isSubmittingFailed$ = this.facade.isSubmittingFailed$;
    this.isTokenChecking$ = this.facade.isTokenChecking$;
    this.isInvalidToken$ = this.facade.isInvalidToken$;
    this.isNewUser$ = this.facade.isNewUser$;
    this.formState$ = this.facade.formState$;
  }

  public formSubmitted(): void {
    this.facade.restorePassword();
  }

  public formActionTriggered(action: Actions<any>): void {
    this.facade.handleFormStateAction(action);
  }
}
