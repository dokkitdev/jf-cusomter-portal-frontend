import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { Actions, FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { PublicLoginConfirmationPageForm } from './shared/forms';
import { PublicLoginConfirmationPageFacade } from './login-confirmation.facade';
import { Masked } from 'imask';
import { configuration } from '@configurations';

@Component({
  selector: 'public-login-confirmation',
  templateUrl: 'login-confirmation.html',
  styleUrls: ['login-confirmation.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class PublicLoginConfirmationPageComponent implements OnInit, OnDestroy {
  public formState$: Observable<FormGroupState<PublicLoginConfirmationPageForm>>;
  public isSubmitting$: Observable<boolean>;
  public isConfirmLoginFailed$: Observable<boolean>;
  public codeMask: Masked;

  constructor(private facade: PublicLoginConfirmationPageFacade) {
    this.formState$ = this.facade.formState$;
    this.isSubmitting$ = this.facade.isSubmitting$;
    this.isConfirmLoginFailed$ = this.facade.isConfirmLoginFailed$;
    this.codeMask = configuration.masks.code;
  }

  public ngOnInit(): void {
    this.facade.fillFormByQueryParams();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public formSubmitted(): void {
    this.facade.confirmLogin();
  }

  public formActionTriggered(action: Actions<any>): void {
    this.facade.handleFormStateAction(action);
  }
}
