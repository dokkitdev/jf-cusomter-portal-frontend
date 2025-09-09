import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountReportsZeroPageComponent } from './zero.component';
import { AccountReportsZeroPageRoutingModule } from './zero.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountReportsZeroPageFacade } from './zero.facade';
import { ComponentStore } from '@ngrx/component-store';
import { AccountReportsZeroFormComponent } from './shared/components/form/form.component';
import { AccountReportsZeroSuccessComponent } from './shared/components/success/success.component';
import { LetDirective, PushPipe } from '@ngrx/component';
import { ButtonModule } from '@shared/button';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { NotificationModule } from '@shared/notification';
import { NgrxFormsModule } from 'ngrx-forms';
import { DateRangepickerModule } from '@shared/date-rangepicker';
import { NotifyModule } from '@shared/notify';
import { ReportSuccessModule } from '@app/account/shared/report-success';

@NgModule({
  declarations: [AccountReportsZeroPageComponent, AccountReportsZeroFormComponent, AccountReportsZeroSuccessComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountReportsZeroPageRoutingModule,
    NgrxFormsModule,
    DateRangepickerModule,
    LetDirective,
    PushPipe,
    NotificationModule,
    LoadingSpinnerModule,
    ButtonModule,
    NotifyModule,
    ReportSuccessModule
  ],
  providers: [AccountReportsZeroPageFacade, ComponentStore]
})
export class AccountReportsZeroPageModule {}
