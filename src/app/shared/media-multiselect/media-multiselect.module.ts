import { CommonModule } from '@angular/common';
import { MediaMultiselectComponent } from './media-multiselect.component';
import { NgModule } from '@angular/core';
import { MediaMultiselectFacade } from './media-multiselect.facade';
import { TranslateModule } from '@ngx-translate/core';
import { MediaModule } from '@shared/media';
import { LetDirective, PushPipe } from '@ngrx/component';
import { ComponentStore } from '@ngrx/component-store';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MediaMultiselectItemComponent } from './components/item/item.component';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { NgxFilesizeModule } from 'ngx-filesize';

@NgModule({
  declarations: [MediaMultiselectComponent, MediaMultiselectItemComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MediaModule,
    LetDirective,
    PushPipe,
    NgxDropzoneModule,
    NgForTrackByPropertyModule,
    NgxFilesizeModule
  ],
  exports: [MediaMultiselectComponent],
  providers: [MediaMultiselectFacade, ComponentStore]
})
export class MediaMultiselectModule {}
