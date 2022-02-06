import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from '@shared/media';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { ImageUploaderComponentState } from './image-uploader.state';
import { switchMap, tap, filter } from 'rxjs/operators';
import { MediaService } from '../media/media.service';
import { isNumber } from 'lodash';
import { Actions, SetValueAction, MarkAsDirtyAction } from 'ngrx-forms';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@shared/notification';

@Injectable()
export class ImageUploaderFacade {
  public get image$(): Observable<Media> {
    return this.componentStore.select((state) => state.image);
  }

  public get progress$(): Observable<number> {
    return this.componentStore.select((state) => state.progress);
  }

  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get isUploading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isUploading);
  }

  public controlStateActionTriggered: EventEmitter<Actions<any>>;
  public startUploading: EventEmitter<void>;
  public endUploading: EventEmitter<void>;

  private uploadImageEffect$: ([file, controlID]: [File, string]) => Observable<void>;
  private loadMediaEffect$: (mediaID: number) => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<ImageUploaderComponentState>,
    private readonly mediaService: MediaService,
    private readonly translateService: TranslateService,
    private readonly notificationService: NotificationService
  ) {
    this.controlStateActionTriggered = new EventEmitter<Actions<any>>();
    this.startUploading = new EventEmitter<void>();
    this.endUploading = new EventEmitter<void>();

    this.resetState();

    this.registerLoadMediaEffect();
    this.registerUploadImageEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new ImageUploaderComponentState());
  }

  public uploadImage(file: File, controlID: string): void {
    this.uploadImageEffect$([file, controlID]);
  }

  public loadMedia(mediaID: number): void {
    this.loadMediaEffect$(mediaID);
  }

  private updateIsLoading(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isLoading: value
      })
    )();
  }

  private updateIsUploading(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isUploading: value
      })
    )();
  }

  private updateProgress(progress: number): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        progress
      })
    )();
  }

  private updateImage(image: Media): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        image
      })
    )();
  }

  private registerUploadImageEffect(): void {
    this.uploadImageEffect$ = this.componentStore.effect((origin$: Observable<[File, string]>) =>
      origin$.pipe(
        switchMap(([file, controlID]) => {
          this.updateIsUploading(true);
          this.startUploading.emit();

          const newMedia = new Media({ file });

          return this.mediaService
            .createWithProgress(newMedia)
            .pipe(
              tap((value) => {
                if (isNumber(value)) {
                  this.updateProgress(value);
                }
              }),
              filter((response): response is Media => response instanceof Media),
              tapResponse(
                (response: Media) => {
                  this.controlStateActionTriggered.emit(new SetValueAction(controlID, response.id));
                  this.controlStateActionTriggered.emit(new MarkAsDirtyAction(controlID));
                  this.endUploading.emit();
                  this.updateIsUploading(false);
                  this.updateImage(response);
                  this.updateProgress(0);
                },
                () => {
                  this.endUploading.emit();
                  this.updateIsUploading(false);
                  this.updateProgress(0);
                  this.notificationService.error(
                    this.translateService.instant('SHARED.IMAGE_UPLOADER.NOTIFICATIONS.TEXT_UPLOADING_ERROR')
                  );
                }
              )
            );
        })
      )
    );
  }

  private registerLoadMediaEffect(): void {
    this.loadMediaEffect$ = this.componentStore.effect((origin$: Observable<number>) =>
      origin$.pipe(
        switchMap((mediaID) => {
          this.updateIsLoading(true);

          return this.mediaService
            .get(mediaID)
            .pipe(
              tapResponse(
                (response: Media) => {
                  this.updateIsLoading(false);
                  this.updateImage(response);
                },
                () => this.updateIsLoading(false)
              )
            );
        })
      )
    );
  }
}
