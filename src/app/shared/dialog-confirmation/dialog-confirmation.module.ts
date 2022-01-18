import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogConfirmationComponent } from './dialog-confirmation.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DialogConfirmationComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    DialogConfirmationComponent
  ]
})
export class DialogConfirmationModule { }
