import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PublicLoginPageComponent } from './login.component';
import { PublicLoginPageRoutingModule } from './login.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormTextModule } from '@shared/form-text';
import { PublicLoginPageFacade } from './login.facade';
import { ComponentStore } from '@ngrx/component-store';
import { NgrxFormsModule } from 'ngrx-forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { PublicLayoutModule } from '../shared/layout';
import { RouteLinkModule } from '@shared/route-link';
import { FormErrorModule } from '@shared/form-error';
import { PublicLoginRequestErrorComponent } from './shared/components/request-error/request-error.component';
import { ButtonModule } from '@shared/button';

@NgModule({
  declarations: [
    PublicLoginPageComponent,
    PublicLoginRequestErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    PublicLoginPageRoutingModule,
    NgrxFormsModule,
    FormTextModule,
    ReactiveComponentModule,
    PublicLayoutModule,
    RouteLinkModule,
    FormErrorModule,
    ButtonModule
  ],
  providers: [
    PublicLoginPageFacade,
    ComponentStore
  ]
})
export class PublicLoginPageModule { }
