import { ButtonModule } from './../../../shared/button/button.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { AccountDialogAddDocumentComponent } from './dialog-add-document.component';
import { FormTextModule } from '@shared/form-text';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { DocumentModule } from '@shared/document';
import { FormTextareaModule } from '@shared/form-textarea';
import { ImageUploaderModule } from '@shared/image-uploader';

@NgModule({
  declarations: [
    AccountDialogAddDocumentComponent
  ],
  imports: [
    CommonModule,
    NgrxFormsModule,
    TranslateModule,
    MatDialogModule,
    ReactiveComponentModule,
    LoadingSpinnerModule,
    DocumentModule,
    FormTextModule,
    FormTextareaModule,
    ImageUploaderModule,
    ButtonModule
  ],
  exports: [
    AccountDialogAddDocumentComponent
  ]
})
export class AccountDialogAddDocumentModule { }
