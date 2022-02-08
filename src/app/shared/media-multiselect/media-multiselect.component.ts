import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { configuration } from '@configurations';
import { MediaMultiselectFacade } from './media-multiselect.facade';
import { NgrxDefaultViewAdapter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';
import { Media } from '@shared/media';
import { Observable, Subject } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

@Component({
  selector: 'media-multiselect',
  templateUrl: 'media-multiselect.html',
  styleUrls: ['media-multiselect.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MediaMultiselectFacade,
    ComponentStore,
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    }
  ]
})
export class MediaMultiselectComponent implements OnDestroy {
  @Input() placeholder: string;
  @Input() label: string;
  @Input() isDisabled: boolean;
  @Input() maxFileSize: boolean;
  @Input() allowedFileExtensions: Array<string>;

  @Output() itemsChanged: Subject<Array<Media>>;

  public get acceptingFiles(): string {
    return this.allowedFileExtensions.join(',');
  }

  public get extensionRequirements(): string {
    return this.allowedFileExtensions.map((item) => {
      const [, extension] = item.split('/');

      return `.${extension.toUpperCase()}`;
    }).join(', ');
  }

  public items$: Observable<Array<Media>>;
  public fileSizeBase: number;

  constructor(
    private facade: MediaMultiselectFacade
  ) {
    this.itemsChanged = this.facade.itemsChanged;
    this.items$ = this.facade.items$;
    this.allowedFileExtensions = configuration.allowedFileExtensions.default;
    this.fileSizeBase = configuration.fileSize.base;
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public filesSelected(event: NgxDropzoneChangeEvent): void {
    if (event.addedFiles.length) {
      this.facade.addFiles(event.addedFiles);
    }
  }

  public removeFileClicked(index: number): void {
    this.facade.removeFile(index);
  }
}
