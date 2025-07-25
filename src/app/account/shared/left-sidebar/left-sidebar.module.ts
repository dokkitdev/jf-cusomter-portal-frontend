import { AccountLeftSidebarFacade } from './left-sidebar.facade';
import { ComponentStore } from '@ngrx/component-store';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountLeftSidebarComponent } from './left-sidebar.component';
import { TranslateModule } from '@ngx-translate/core';
import { LetDirective, PushPipe } from '@ngrx/component';
import { DialogModule } from '@shared/dialog';
import { DialogConfirmationModule } from '@shared/dialog-confirmation';

@NgModule({
  declarations: [
    AccountLeftSidebarComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    LetDirective, PushPipe,
    DialogModule,
    DialogConfirmationModule
  ],
  providers: [
    AccountLeftSidebarFacade,
    ComponentStore
  ],
  exports: [
    AccountLeftSidebarComponent
  ]
})
export class AccountLeftSidebarModule { }
