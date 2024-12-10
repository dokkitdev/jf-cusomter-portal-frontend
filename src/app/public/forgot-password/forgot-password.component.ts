import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicForgotPasswordPageFacade } from './forgot-password.facade';

@Component({
  selector: 'public-forgot-password-page',
  templateUrl: 'forgot-password.html',
  styleUrls: ['forgot-password.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicForgotPasswordPageComponent implements OnDestroy {
  public isRecoveryEmailSent$: Observable<boolean>;

  constructor(private facade: PublicForgotPasswordPageFacade) {
    this.isRecoveryEmailSent$ = this.facade.isRecoveryEmailSent$;
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
