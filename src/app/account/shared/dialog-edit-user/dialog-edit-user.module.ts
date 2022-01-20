import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { AccountDialogEditUserComponent } from './dialog-edit-user.component';
import { FormTextModule } from '@shared/form-text';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AccountDialogEditUserComponent
  ],
  imports: [
    CommonModule,
    NgrxFormsModule,
    TranslateModule,
    MatDialogModule,
    ReactiveComponentModule,
    FormTextModule
  ],
  exports: [
    AccountDialogEditUserComponent
  ]
})
export class AccountDialogEditUserModule { }
