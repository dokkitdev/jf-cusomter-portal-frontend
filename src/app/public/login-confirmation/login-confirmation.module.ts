import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormTextModule } from '@shared/form-text';
import { ComponentStore } from '@ngrx/component-store';
import { NgrxFormsModule } from 'ngrx-forms';
import { LetDirective, PushPipe } from '@ngrx/component';
import { PublicLayoutModule } from '../shared/layout';
import { RouteLinkModule } from '@shared/route-link';
import { FormErrorModule } from '@shared/form-error';
import { ButtonModule } from '@shared/button';
import { PublicLoginConfirmationPageRoutingModule } from './login-confirmation.routing';
import { PublicLoginConfirmationPageComponent } from './login-confirmation.component';
import { PublicLoginConfirmationMessageComponent } from './shared/components/message/message.component';
import { PublicLoginConfirmationPageFacade } from './login-confirmation.facade';
import { PublicLoginConfirmationRequestErrorComponent } from './shared/components/request-error/request-error.component';

@NgModule({
  declarations: [
    PublicLoginConfirmationPageComponent,
    PublicLoginConfirmationMessageComponent,
    PublicLoginConfirmationRequestErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    PublicLoginConfirmationPageRoutingModule,
    NgrxFormsModule,
    FormTextModule,
    LetDirective,
    PushPipe,
    PublicLayoutModule,
    RouteLinkModule,
    FormErrorModule,
    ButtonModule
  ],
  providers: [PublicLoginConfirmationPageFacade, ComponentStore]
})
export class PublicLoginConfirmationPageModule {}
