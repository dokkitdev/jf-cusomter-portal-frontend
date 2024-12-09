import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'login-confirmation-message',
  templateUrl: 'message.html',
  styleUrls: ['message.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicLoginConfirmationMessageComponent {
  // public isRecoveryEmailSent$: Observable<boolean>;

  constructor() {
    // private facade: PublicForgotPasswordPageFacade
    // this.isRecoveryEmailSent$ = this.facade.isRecoveryEmailSent$;
  }
}
