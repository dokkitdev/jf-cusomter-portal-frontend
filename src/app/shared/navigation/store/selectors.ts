import { AppState } from '@shared/store';
import { createFeatureSelector } from '@ngrx/store';
import { Data, Params } from '@angular/router';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';

const selectRouter = createFeatureSelector<AppState, RouterReducerState<any>>('router');
const {
  selectCurrentRoute,
  selectQueryParams,
  selectQueryParam,
  selectRouteParams,
  selectRouteParam,
  selectRouteData,
  selectUrl
} = getSelectors(selectRouter);

export class NavigationSelectors {
  public static selectCurrentRoute: (state: AppState) => any = selectCurrentRoute;
  public static selectQueryParams: (state: AppState) => Params = selectQueryParams;
  public static selectQueryParam: (param: string) => (state: AppState) => string | undefined = selectQueryParam;
  public static selectRouteParams: (state: AppState) => Params = selectRouteParams;
  public static selectRouteParam: (param: string) => (state: AppState) => string | undefined = selectRouteParam;
  public static selectRouteData: (state: AppState) => Data = selectRouteData;
  public static selectUrl: (state: AppState) => string = selectUrl;
}
