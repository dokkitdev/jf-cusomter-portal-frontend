import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PublicForgotPasswordPageFacade } from '@app/public/forgot-password/forgot-password.facade';
import { Actions, FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { PublicForgotPasswordPageForm } from '../../forms';

@Component({
    selector: 'forgot-password-form',
    templateUrl: 'form.html',
    styleUrls: ['form.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PublicForgotPasswordFormComponent {
  public isSubmitting$: Observable<boolean>;
  public isSubmittingFailed$: Observable<boolean>;
  public formState$: Observable<FormGroupState<PublicForgotPasswordPageForm>>;

  constructor(
    private facade: PublicForgotPasswordPageFacade
  ) {
    this.isSubmitting$ = this.facade.isSubmitting$;
    this.isSubmittingFailed$ = this.facade.isSubmittingFailed$;
    this.formState$ = this.facade.formState$;
  }

  public formSubmitted(): void {
    this.facade.sendRecoveryEmail();
  }

  public formActionTriggered(action: Actions<any>): void {
    this.facade.handleFormStateAction(action);
  }
}
