import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PublicResetPasswordPageComponent } from './reset-password.component';
import { PublicResetPasswordPageRoutingModule } from './reset-password.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PublicResetPasswordPageFacade } from './reset-password.facade';
import { ComponentStore } from '@ngrx/component-store';
import { PublicResetPasswordFormComponent } from './shared/components/form/form.component';
import { PublicResetPasswordRequestErrorComponent } from './shared/components/request-error/request-error.component';
import { NgrxFormsModule } from 'ngrx-forms';
import { LetDirective, PushPipe } from '@ngrx/component';
import { FormTextModule } from '@shared/form-text';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { PublicLayoutModule } from '../shared/layout';
import { RouteLinkModule } from '@shared/route-link';
import { FormErrorModule } from '@shared/form-error';
import { ButtonModule } from '@shared/button';

@NgModule({
  declarations: [
    PublicResetPasswordPageComponent,
    PublicResetPasswordFormComponent,
    PublicResetPasswordRequestErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    PublicResetPasswordPageRoutingModule,
    NgrxFormsModule,
    LetDirective, PushPipe,
    FormTextModule,
    LoadingSpinnerModule,
    PublicLayoutModule,
    RouteLinkModule,
    FormErrorModule,
    ButtonModule
  ],
  providers: [
    PublicResetPasswordPageFacade,
    ComponentStore
  ]
})
export class PublicResetPasswordPageModule { }
