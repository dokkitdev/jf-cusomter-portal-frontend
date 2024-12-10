import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PublicLoginConfirmationPageFacade } from '@app/public/login-confirmation/login-confirmation.facade';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'login-confirmation-message',
  templateUrl: 'message.html',
  styleUrls: ['message.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicLoginConfirmationMessageComponent {
  // public isRecoveryEmailSent$: Observable<boolean>;
  public email$: Observable<string>;

  constructor(private facade: PublicLoginConfirmationPageFacade) {
    this.email$ = this.facade.formState$.pipe(
      map((state) => state.value.email)
    );
    // private facade: PublicForgotPasswordPageFacade
    // this.isRecoveryEmailSent$ = this.facade.isRecoveryEmailSent$;
  }
}
