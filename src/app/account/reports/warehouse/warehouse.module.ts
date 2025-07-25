import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountReportsWarehousePageComponent } from './warehouse.component';
import { AccountReportsWarehousePageRoutingModule } from './warehouse.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountReportsWarehousePageFacade } from './warehouse.facade';
import { ComponentStore } from '@ngrx/component-store';
import { AccountReportsWarehouseFormComponent } from './shared/components/form/form.component';
import { LetModule, PushModule } from '@ngrx/component';
import { ButtonModule } from '@shared/button';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { NotificationModule } from '@shared/notification';
import { NgrxFormsModule } from 'ngrx-forms';
import { FormRadioModule } from '@shared/form-radio';

@NgModule({
  declarations: [
    AccountReportsWarehousePageComponent,
    AccountReportsWarehouseFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountReportsWarehousePageRoutingModule,
    NgrxFormsModule,
    FormRadioModule,
    LetModule, PushModule,
    NotificationModule,
    LoadingSpinnerModule,
    ButtonModule
  ],
  providers: [
    AccountReportsWarehousePageFacade,
    ComponentStore
  ]
})
export class AccountReportsWarehousePageModule { }
