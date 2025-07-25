import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './image-uploader.component';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { ImageUploaderFacade } from './image-uploader.facade';
import { TranslateModule } from '@ngx-translate/core';
import { MediaModule } from '@shared/media';
import { ProgressBarModule } from '@shared/progress-bar';
import { LetModule, PushModule } from '@ngrx/component';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { ComponentStore } from '@ngrx/component-store';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ValidationErrorsModule } from '@shared/validation-errors';
import { NotificationModule } from '@shared/notification';
import { NgxFilesizeModule } from 'ngx-filesize';

@NgModule({
  declarations: [
    ImageUploaderComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    NgrxFormsModule,
    MediaModule,
    ProgressBarModule,
    LetModule, PushModule,
    LoadingSpinnerModule,
    NgxDropzoneModule,
    ValidationErrorsModule,
    NotificationModule,
    NgxFilesizeModule
  ],
  exports: [
    ImageUploaderComponent
  ],
  providers: [
    ImageUploaderFacade,
    ComponentStore
  ]
})
export class ImageUploaderModule { }
