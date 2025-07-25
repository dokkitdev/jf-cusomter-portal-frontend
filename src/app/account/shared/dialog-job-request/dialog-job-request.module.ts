import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { LetDirective, PushPipe } from '@ngrx/component';
import { AccountDialogJobRequestComponent } from './dialog-job-request.component';
import { FormTextareaModule } from '@shared/form-textarea';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MediaMultiselectModule } from '@shared/media-multiselect';
import { JobModule } from '@shared/job';
import { ButtonModule } from '@shared/button';
import { FormTextModule } from '@shared/form-text';

@NgModule({
  declarations: [
    AccountDialogJobRequestComponent
  ],
  imports: [
    CommonModule,
    NgrxFormsModule,
    TranslateModule,
    MatDialogModule,
    LetDirective, PushPipe,
    FormTextModule,
    FormTextareaModule,
    MediaMultiselectModule,
    JobModule,
    ButtonModule
  ],
  exports: [
    AccountDialogJobRequestComponent
  ]
})
export class AccountDialogJobRequestModule { }
