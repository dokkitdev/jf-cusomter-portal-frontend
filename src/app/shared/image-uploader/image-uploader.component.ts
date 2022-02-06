import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { configuration } from '@configurations';
import { ImageUploaderFacade } from './image-uploader.facade';
import { FormControlState, NgrxDefaultViewAdapter, NGRX_FORM_VIEW_ADAPTER, Actions } from 'ngrx-forms';
import { Media } from '@shared/media';
import { Observable } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { SpinnerDiameter } from '@shared/loading-spinner';

@Component({
  selector: 'image-uploader',
  templateUrl: 'image-uploader.html',
  styleUrls: ['image-uploader.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ImageUploaderFacade,
    ComponentStore,
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    }
  ]
})
export class ImageUploaderComponent implements OnInit, OnDestroy {
  @Input() controlState: FormControlState<number>;
  @Input() validationMessages: Map<string, string>;
  @Input() placeholder: string;
  @Input() maxFileSize: boolean;
  @Input() allowedFileExtensions: Array<string>;

  @Output() controlStateActionTriggered: EventEmitter<Actions<any>>;
  @Output() startUploading: EventEmitter<void>;
  @Output() endUploading: EventEmitter<void>;

  public progress$: Observable<number>;
  public isUploading$: Observable<boolean>;
  public image$: Observable<Media>;
  public spinnerDiameter: typeof SpinnerDiameter;
  public fileSizeBase: number;

  public get acceptingFiles(): string {
    return this.allowedFileExtensions.join(',');
  }

  public get extensionRequirements(): string {
    return this.allowedFileExtensions.map((item) => {
      const [, extension] = item.split('/');

      return `.${extension.toUpperCase()}`;
    }).join(', ');
  }

  constructor(
    private facade: ImageUploaderFacade
  ) {
    this.controlStateActionTriggered = this.facade.controlStateActionTriggered;
    this.startUploading = this.facade.startUploading;
    this.endUploading = this.facade.endUploading;
    this.spinnerDiameter = SpinnerDiameter;
    this.progress$ = this.facade.progress$;
    this.isUploading$ = this.facade.isUploading$;
    this.image$ = this.facade.image$;
    this.allowedFileExtensions = configuration.allowedFileExtensions.default;
    this.fileSizeBase = configuration.fileSize.base;
  }

  public ngOnInit(): void {
    if (this.controlState?.value) {
      this.facade.loadMedia(this.controlState.value);
    }
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public fileSelected(event: NgxDropzoneChangeEvent): void {
    if (event.addedFiles.length) {
      this.facade.uploadImage(event.addedFiles[0], this.controlState.id);
    }
  }
}
