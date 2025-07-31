import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PublicForgotPasswordPageFacade } from '@app/public/forgot-password/forgot-password.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'forgot-password-message',
  templateUrl: 'message.html',
  styleUrls: ['message.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class PublicForgotPasswordMessageComponent {
  public isRecoveryEmailSent$: Observable<boolean>;

  constructor(private facade: PublicForgotPasswordPageFacade) {
    this.isRecoveryEmailSent$ = this.facade.isRecoveryEmailSent$;
  }
}
