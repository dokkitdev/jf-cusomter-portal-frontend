import { AuthResponse, AuthService as CommonAuthService } from '@ronas-it/angular-common';
import { Injectable, Injector } from '@angular/core';
import { User } from '@shared/user';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RestorePasswordRequest, AuthCredentials } from './models';
import { classToPlain } from 'class-transformer';
import { ClassGroup } from '@shared/class-group';

@Injectable()
export class AuthService extends CommonAuthService<User> {
  public endpoint: string;

  constructor(protected injector: Injector) {
    super(injector);

    this.endpoint = '/auth';
  }

  public signIn(credentials: AuthCredentials, remember: boolean): Observable<AuthResponse<User>> {
    return super.authorize(credentials, remember).pipe(switchMap((authResponse) => this.refreshProfile(authResponse)));
  }

  public sendAuthCode(email: string): Observable<void> {
    return this.apiService.post(`${this.endpoint}/2fa-codes`, { email });
  }

  public sendRecoveryEmail(email: string): Observable<void> {
    return this.apiService.post(`${this.endpoint}/forgot-password`, { email });
  }

  public restorePasswordRequest(request: RestorePasswordRequest): Observable<void> {
    return this.apiService.post(
      `${this.endpoint}/restore-password`,
      classToPlain(request, { groups: [ClassGroup.MAIN] })
    );
  }

  public checkRestoreToken(token: string): Observable<void> {
    return this.apiService.post(`${this.endpoint}/token/check`, { token });
  }

  private refreshProfile(authResponse: AuthResponse<User>): Observable<AuthResponse<User>> {
    return this.userService.refreshProfile().pipe(map(() => authResponse));
  }
}
