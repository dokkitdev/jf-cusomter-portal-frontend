import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountReportsZeroPageComponent } from './zero.component';
import { AccountReportsZeroPageRoutingModule } from './zero.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountReportsZeroPageFacade } from './zero.facade';
import { ComponentStore } from '@ngrx/component-store';
import { AccountReportsZeroFormComponent } from './shared/components/form/form.component';
import { LetModule, PushModule } from '@ngrx/component';
import { ButtonModule } from '@shared/button';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { NotificationModule } from '@shared/notification';
import { NgrxFormsModule } from 'ngrx-forms';
import { FormRadioModule } from '@shared/form-radio';
import { DateRangepickerModule } from '@shared/date-rangepicker';

@NgModule({
  declarations: [
    AccountReportsZeroPageComponent,
    AccountReportsZeroFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountReportsZeroPageRoutingModule,
    NgrxFormsModule,
    FormRadioModule,
    LetModule, PushModule,
    NotificationModule,
    LoadingSpinnerModule,
    ButtonModule,
    DateRangepickerModule
  ],
  providers: [
    AccountReportsZeroPageFacade,
    ComponentStore
  ]
})
export class AccountReportsZeroPageModule { }
