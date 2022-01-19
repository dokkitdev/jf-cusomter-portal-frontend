import { AuthCredentials, AuthResponse, AuthService as CommonAuthService } from '@ronas-it/angular-common';
import { Injectable, Injector } from '@angular/core';
import { User } from '@shared/user';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService extends CommonAuthService<User> {
  public endpoint: string;

  constructor(
    protected injector: Injector
  ) {
    super(injector);

    this.endpoint = '/auth';
  }

  public authorize(credentials: AuthCredentials, remember: boolean): Observable<AuthResponse<User>> {
    return super
      .authorize(credentials, remember)
      .pipe(
        switchMap((authResponse) => this.refreshProfile(authResponse))
      );
  }

  public sendRecoveryEmail(email: string): Observable<void> {
    return this.apiService.post(`${this.endpoint}/forgot-password`, { email });
  }

  private refreshProfile(authResponse: AuthResponse<User>): Observable<AuthResponse<User>> {
    return this.userService
      .refreshProfile()
      .pipe(
        map(() => authResponse)
      );
  }
}
