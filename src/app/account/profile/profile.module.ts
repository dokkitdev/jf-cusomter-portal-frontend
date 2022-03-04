import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountProfilePageComponent } from './profile.component';
import { AccountProfilePageRoutingModule } from './profile.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountProfilePageFacade } from './profile.facade';
import { ComponentStore } from '@ngrx/component-store';
import { NgrxFormsModule } from 'ngrx-forms';
import { FormTextModule } from '@shared/form-text';
import { AccountProfileFormComponent } from './shared/components/form/form.component';
import { ReactiveComponentModule } from '@ngrx/component';
import { NotificationModule } from '@shared/notification';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { ButtonModule } from '@shared/button';

@NgModule({
  declarations: [
    AccountProfilePageComponent,
    AccountProfileFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountProfilePageRoutingModule,
    NgrxFormsModule,
    FormTextModule,
    ReactiveComponentModule,
    NotificationModule,
    LoadingSpinnerModule,
    ButtonModule
  ],
  providers: [
    AccountProfilePageFacade,
    ComponentStore
  ]
})
export class AccountProfilePageModule { }
