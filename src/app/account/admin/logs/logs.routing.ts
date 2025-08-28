import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountAdminLogsPageComponent } from './logs.component';

const routes: Routes = [
  {
    path: '',
    component: AccountAdminLogsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountAdminLogsPageRoutingModule {}
