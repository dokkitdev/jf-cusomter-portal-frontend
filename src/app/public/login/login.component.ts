import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Actions, FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { PublicLoginPageForm } from './shared/forms';
import { PublicLoginPageFacade } from './login.facade';

@Component({
    selector: 'public-login-page',
    templateUrl: 'login.html',
    styleUrls: ['login.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PublicLoginPageComponent implements OnDestroy {
  public formState$: Observable<FormGroupState<PublicLoginPageForm>>;
  public isSubmitting$: Observable<boolean>;
  public isLoginFailed$: Observable<boolean>;

  constructor(
    private facade: PublicLoginPageFacade
  ) {
    this.formState$ = this.facade.formState$;
    this.isSubmitting$ = this.facade.isSubmitting$;
    this.isLoginFailed$ = this.facade.isLoginFailed$;
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public formSubmitted(): void {
    this.facade.tryLogin();
  }

  public formActionTriggered(action: Actions<any>): void {
    this.facade.handleFormStateAction(action);
  }
}
