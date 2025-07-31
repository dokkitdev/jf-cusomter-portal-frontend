import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reset-password-request-error',
  templateUrl: 'request-error.html',
  styleUrls: ['request-error.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class PublicResetPasswordRequestErrorComponent {}
