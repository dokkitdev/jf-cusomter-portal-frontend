import { NotificationModule } from './../../../shared/notification/notification.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { AccountDialogEditUserComponent } from './dialog-edit-user.component';
import { FormTextModule } from '@shared/form-text';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountCustomerSelectModule } from '../customer-select';
import { FormCheckboxModule } from '@shared/form-checkbox';
import { FormGroupModule } from '@shared/form-group';
import { AccountCustomersModule } from '../customers';

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
    LoadingSpinnerModule,
    FormTextModule,
    AccountCustomerSelectModule,
    FormCheckboxModule,
    FormGroupModule,
    AccountCustomersModule,
    NotificationModule
  ],
  exports: [
    AccountDialogEditUserComponent
  ]
})
export class AccountDialogEditUserModule { }
