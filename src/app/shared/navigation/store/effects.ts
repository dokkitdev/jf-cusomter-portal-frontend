import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NavigationActions } from './actions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class NavigationEffects {
  public mergeQueryParam$: Observable<boolean> = createEffect(() =>
    this.actions$.pipe(
      ofType(NavigationActions.mergeQueryParam),
      concatMap((action) => this.router.navigate([], {
          queryParams: {
            [action.name]: action.value
          },
          queryParamsHandling: 'merge'
        }))
    ),
    { dispatch: false }
  );

  public mergeQueryParams$: Observable<boolean> = createEffect(() =>
    this.actions$.pipe(
      ofType(NavigationActions.mergeQueryParams),
      concatMap((action) => this.router.navigate([], {
          queryParams: action.queryParams,
          queryParamsHandling: 'merge'
        }))
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router
  ) { }
}
