import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from '@shared/dialog';
import { DialogConfirmationComponent, DialogConfirmationConfig } from '@shared/dialog-confirmation';
import { DocumentService } from '@shared/document';
import { FileService } from '@shared/file';
import { Media, MediaService } from '@shared/media';
import { NotificationService } from '@shared/notification';
import { EMPTY, Observable, Subject } from 'rxjs';
import { exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { AccountAdminDocumentsItemComponentState } from './item.state';

@Injectable()
export class AccountAdminDocumentsItemComponentFacade {
  public get isSendingRequest$(): Observable<boolean> {
    return this.componentStore.select((store) => store.isSendingRequest);
  }

  public deletingSuccessSubject: Subject<number>;

  private viewMediaEffect$: (media: Media) => Observable<void>;
  private downloadMediaEffect$: (media: Media) => Observable<void>;
  private deleteItemEffect$: (id: number) => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountAdminDocumentsItemComponentState>,
    private readonly documentService: DocumentService,
    private readonly dialogService: DialogService,
    private readonly translateService: TranslateService,
    private readonly notificationService: NotificationService,
    private readonly mediaService: MediaService,
    private readonly fileService: FileService
  ) {
    this.deletingSuccessSubject = new Subject();

    this.resetState();
    this.registerDeleteItemEffect();
    this.registerViewMediaEffect();
    this.registerDownloadMediaEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountAdminDocumentsItemComponentState());
  }

  public viewMedia(media: Media): void {
    this.viewMediaEffect$(media);
  }

  public downloadMedia(media: Media): void {
    this.downloadMediaEffect$(media);
  }

  public deleteItem(id: number): void {
    this.deleteItemEffect$(id);
  }

  private updateIsSendingRequest(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isSendingRequest: value
      })
    )();
  }

  private registerDeleteItemEffect(): void {
    this.deleteItemEffect$ = this.componentStore.effect((origin$: Observable<number>) =>
      origin$.pipe(
        map((id) => this.dialogService.open(DialogConfirmationComponent, {
          data: new DialogConfirmationConfig({
            title: this.translateService.instant('ACCOUNT.ADMIN.DOCUMENTS.DIALOG_DELETE_ITEM.TEXT_TITLE'),
            text: this.translateService.instant('ACCOUNT.ADMIN.DOCUMENTS.DIALOG_DELETE_ITEM.TEXT_MESSAGE'),
            cancelButtonText: this.translateService.instant('ACCOUNT.ADMIN.DOCUMENTS.DIALOG_DELETE_ITEM.BUTTON_CANCEL'),
            confirmButtonText: this.translateService.instant('ACCOUNT.ADMIN.DOCUMENTS.DIALOG_DELETE_ITEM.BUTTON_CONFIRM'),
            resultData: id
          })
        })),
        switchMap((dialogRef) => dialogRef.afterClosed()),
        exhaustMap((result) => {
          if (result) {
            this.updateIsSendingRequest(true);

            return this.tryToDeleteDocument(result);
          }

          return EMPTY;
        })
      )
    );
  }

  private tryToDeleteDocument(id: number): Observable<void> {
    return this.documentService
      .delete(id)
      .pipe(
        tapResponse(
          () => {
            this.updateIsSendingRequest(false);

            this.deletingSuccessSubject.next(id);

            this.notificationService.success(
              this.translateService.instant('ACCOUNT.ADMIN.DOCUMENTS.NOTIFICATIONS.TEXT_DOCUMENT_DELETED')
            );
          },
          () => {
            this.updateIsSendingRequest(false);

            this.notificationService.error(
              this.translateService.instant('ACCOUNT.ADMIN.DOCUMENTS.NOTIFICATIONS.TEXT_ERROR')
            );
          }
        )
      );
  }

  private registerViewMediaEffect(): void {
    this.viewMediaEffect$ = this.componentStore.effect((origin$: Observable<Media>) =>
      origin$.pipe(
        exhaustMap((media) =>
          this.mediaService
            .getBlob(media.id)
            .pipe(
              tap((response) => this.fileService.openInNewTab(response))
            )
        )
      )
    );
  }

  private registerDownloadMediaEffect(): void {
    this.downloadMediaEffect$ = this.componentStore.effect((origin$: Observable<Media>) =>
      origin$.pipe(
        exhaustMap((media) =>
          this.mediaService
            .getBlob(media.id)
            .pipe(
              tap((response) => this.fileService.saveFile(response, media.name))
            )
        )
      )
    );
  }
}
