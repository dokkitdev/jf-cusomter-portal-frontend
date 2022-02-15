import { AccountReportsPageComponent } from './reports.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AccountReportsPageComponent,
    pathMatch: 'full',
    redirectTo: 'service-control'
  },
  {
    path: 'service-control',
    loadChildren: () => import('./service-control/service-control.module').then((module) => module.AccountReportsServiceControlPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountReportsPageRoutingModule { }
