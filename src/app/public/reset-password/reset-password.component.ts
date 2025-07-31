import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicResetPasswordPageFacade } from './reset-password.facade';

@Component({
  selector: 'public-reset-password-page',
  templateUrl: 'reset-password.html',
  styleUrls: ['reset-password.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class PublicResetPasswordPageComponent implements OnInit, OnDestroy {
  public isNewUser$: Observable<boolean>;

  constructor(private facade: PublicResetPasswordPageFacade) {
    this.isNewUser$ = this.facade.isNewUser$;
  }

  public ngOnInit(): void {
    this.facade.checkRestoreToken();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
