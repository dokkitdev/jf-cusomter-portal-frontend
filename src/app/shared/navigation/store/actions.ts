import { createAction, props } from '@ngrx/store';

export class NavigationActions {
  /* tslint:disable:typedef */
  public static mergeQueryParam = createAction(
    '[Navigation] Merge Query Parameter',
    props<{ name: string, value: any }>()
  );

  public static mergeQueryParams = createAction(
    '[Navigation] Merge Query Parameters',
    props<{ queryParams: { [key: string]: any } }>()
  );
  /* tslint:enable:typedef */
}
