import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  public canActivate(): Observable<boolean> {
    return this.userService
      .isAdmin$
      .pipe(
        map((isAdmin) => {
          if (!isAdmin) {
            this.router.navigate(['/account']);
          }

          return isAdmin;
        })
      );
  }
}
