import { AccountReportsPageComponent } from './reports.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'logs'
  },
  {
    path: 'logs',
    component: AccountReportsPageComponent
  },
  {
    path: 'service-control',
    loadChildren: () => import('./service-control/service-control.module').then((module) => module.AccountReportsServiceControlPageModule)
  },
  {
    path: 'repair-response',
    loadChildren: () => import('./kpi/kpi.module').then((module) => module.AccountReportsKPIModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountReportsPageRoutingModule { }
