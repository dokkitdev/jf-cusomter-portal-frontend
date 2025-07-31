import { AccountLeftSidebarModule } from './shared/left-sidebar/left-sidebar.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule, RouterModule, AccountRoutingModule, AccountLeftSidebarModule]
})
export class AccountModule {}
