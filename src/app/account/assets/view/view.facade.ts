import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Asset, AssetAttachment, AssetRelationType, AssetService } from '@shared/asset';
import { AccountAssetsViewPageState } from './view.state';
import { Router } from '@angular/router';
import { FileService } from '@shared/file';
import { NavigationSelectors, NavigationService } from '@shared/navigation';
import { exhaustMap, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { concatLatestFrom } from '@ngrx/effects';

@Injectable()
export class AccountAssetsViewPageFacade {
  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get asset$(): Observable<Asset> {
    return this.componentStore.select((state) => state.asset);
  }

  public get relations$(): Observable<Array<AssetRelationType>> {
    return this.componentStore.select((state) => state.relations);
  }

  private initPageEffect$: () => Observable<void>;
  private downloadAttachmentEffect$: (attachment: AssetAttachment) => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountAssetsViewPageState>,
    private readonly store: Store<AppState>,
    private readonly router: Router,
    private readonly assetService: AssetService,
    private readonly fileService: FileService,
    private readonly navigationService: NavigationService
  ) {
    this.resetState();

    this.registerInitPageEffect();
    this.registerDownloadAttachmentEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountAssetsViewPageState());
  }

  public initPage(): void {
    this.initPageEffect$();
  }

  public downloadAttachment(attachment: AssetAttachment): void {
    this.downloadAttachmentEffect$(attachment);
  }

  public back(): void {
    this.navigationService.back('/account/assets');
  }

  public redirectToAssetsPage(): void {
    this.router.navigate(['/account/assets']);
  }

  private updateIsLoading(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isLoading: value
      })
    )();
  }

  private updateAsset(asset: Asset): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        asset
      })
    )();
  }

  private registerInitPageEffect(): void {
    this.initPageEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        concatLatestFrom(() => [
          this.store.select(NavigationSelectors.selectRouteParam('id')),
          this.relations$
        ]),
        switchMap(([_, id, relations]) => {
          this.updateIsLoading(true);

          if (!!id && !!parseInt(id, 10)) {
            return this.tryToLoadData(parseInt(id, 10), relations);
          }

          this.redirectToAssetsPage();

          return EMPTY;
        })
      )
    );
  }

  private tryToLoadData(id: number, relations: Array<AssetRelationType>): Observable<Asset> {
    return this.assetService
      .get(id, relations)
      .pipe(
        tapResponse(
          (response) => {
            this.updateAsset(response);
            this.updateIsLoading(false);
          },
          (response: HttpErrorResponse) => {
            this.updateIsLoading(false);

            if (response.status === HttpStatusCode.NotFound) {
              this.redirectToAssetsPage();
            }
          }
        )
      );
  }

  private registerDownloadAttachmentEffect(): void {
    this.downloadAttachmentEffect$ = this.componentStore.effect((origin$: Observable<AssetAttachment>) =>
      origin$.pipe(
        exhaustMap((attachment) =>
          this.assetService
            .downloadAttachment(attachment.id)
            .pipe(
              tap((response) => this.fileService.openInNewTab(response))
            )
        )
      )
    );
  }
}
