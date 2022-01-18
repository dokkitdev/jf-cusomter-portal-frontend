import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountLeftSidebarComponent } from './left-sidebar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AccountLeftSidebarComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  providers: [],
  exports: [
    AccountLeftSidebarComponent
  ]
})
export class AccountLeftSidebarModule { }
