import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PublicForgotPasswordPageComponent } from './forgot-password.component';
import { PublicForgotPasswordPageRoutingModule } from './forgot-password.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PublicForgotPasswordPageFacade } from './forgot-password.facade';
import { FormTextModule } from '@shared/form-text';
import { ComponentStore } from '@ngrx/component-store';
import { NgrxFormsModule } from 'ngrx-forms';
import { LetModule, PushModule } from '@ngrx/component';
import { PublicForgotPasswordMessageComponent } from './shared/components/message/message.component';
import { PublicForgotPasswordFormComponent } from './shared/components/form/form.component';
import { PublicForgotPasswordRequestErrorComponent } from './shared/components/request-error/request-error.component';
import { PublicLayoutModule } from '../shared/layout';
import { RouteLinkModule } from '@shared/route-link';
import { FormErrorModule } from '@shared/form-error';
import { ButtonModule } from '@shared/button';

@NgModule({
  declarations: [
    PublicForgotPasswordPageComponent,
    PublicForgotPasswordMessageComponent,
    PublicForgotPasswordFormComponent,
    PublicForgotPasswordRequestErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NgrxFormsModule,
    LetModule, PushModule,
    PublicForgotPasswordPageRoutingModule,
    FormTextModule,
    PublicLayoutModule,
    RouteLinkModule,
    FormErrorModule,
    ButtonModule
  ],
  providers: [
    PublicForgotPasswordPageFacade,
    ComponentStore
  ]
})
export class PublicForgotPasswordPageModule { }
