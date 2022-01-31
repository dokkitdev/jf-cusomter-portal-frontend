import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { AccountDialogEditContactComponent } from './dialog-edit-contact.component';
import { FormTextModule } from '@shared/form-text';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountCustomerSelectModule } from '../customer-select';
import { ContactModule } from '@shared/contact';
import { ButtonModule } from '@shared/button';

@NgModule({
  declarations: [
    AccountDialogEditContactComponent
  ],
  imports: [
    CommonModule,
    NgrxFormsModule,
    TranslateModule,
    MatDialogModule,
    ReactiveComponentModule,
    LoadingSpinnerModule,
    FormTextModule,
    AccountCustomerSelectModule,
    ContactModule,
    ButtonModule
  ],
  exports: [
    AccountDialogEditContactComponent
  ]
})
export class AccountDialogEditContactModule { }
