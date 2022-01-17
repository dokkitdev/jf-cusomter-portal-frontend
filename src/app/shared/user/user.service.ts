import { UserService as CommonUserService } from '@ronas-it/angular-common';
import { Injectable, Injector } from '@angular/core';
import { User } from './models';
import { Observable, of } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { UserRole } from './enums';

@Injectable()
export class UserService extends CommonUserService<User> {
  public endpoint: string;

  public get profile$(): Observable<User> {
    return super.profile$.pipe(
      exhaustMap((profile) => {
        if (profile) {
          return of(profile);
        }

        return this.refreshProfile();
      })
    );
  }

  public get isAdmin$(): Observable<boolean> {
    return this
      .profile$
      .pipe(
        map((profile) => profile.roleID === UserRole.ADMIN)
      );
  }

  constructor(
    protected injector: Injector
  ) {
    super(injector);

    this.endpoint = '/users';
  }
}
