import { AccountReportsASHPUnventedServiceControlPageComponent } from './ashp-unvented-service-control.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AccountReportsASHPUnventedServiceControlPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountReportsServiceControlPageRoutingModule { }
