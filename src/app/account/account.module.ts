import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
