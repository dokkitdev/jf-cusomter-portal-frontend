import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountSitesViewPageComponent } from './view.component';
import { AccountSitesViewPageRoutingModule } from './view.routing';
import { RouterModule } from '@angular/router';
import { NgrxFormsModule } from 'ngrx-forms';
import { TranslateModule } from '@ngx-translate/core';
import { AccountSitesViewPageFacade } from './view.facade';
import { ReactiveComponentModule } from '@ngrx/component';
import { SiteModule } from '@shared/site';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { ComponentStore } from '@ngrx/component-store';
import { FormGroupModule } from '@shared/form-group';
import { FormTextModule } from '@shared/form-text';
import { CustomSelectModule } from '@shared/custom-select';
import { DialogModule } from '@shared/dialog';
import { AccountSitesViewFormComponent } from './shared/components/form/form.component';
import { AccountSitesViewHeaderComponent } from './shared/components/header/header.component';
import { NotificationModule } from '@shared/notification';
import { NavigationModule } from '@shared/navigation';
import { ButtonModule } from '@shared/button';
import { AccountSiteContactsModule } from '@app/account/shared/site-contacts';

@NgModule({
  declarations: [
    AccountSitesViewPageComponent,
    AccountSitesViewFormComponent,
    AccountSitesViewHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NgrxFormsModule,
    AccountSitesViewPageRoutingModule,
    ReactiveComponentModule,
    SiteModule,
    LoadingSpinnerModule,
    FormGroupModule,
    FormTextModule,
    CustomSelectModule,
    DialogModule,
    NotificationModule,
    NavigationModule,
    ButtonModule,
    AccountSiteContactsModule
  ],
  providers: [
    AccountSitesViewPageFacade,
    ComponentStore
  ]
})
export class AccountSitesViewPageModule { }
