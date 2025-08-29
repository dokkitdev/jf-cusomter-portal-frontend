import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'service-control'
  },
  {
    path: 'service-control',
    pathMatch: 'full',
    loadChildren: () =>
      import('./service-control/service-control.module').then((module) => module.AccountReportsServiceControlPageModule)
  },
  {
    path: 'repair-response',
    pathMatch: 'full',
    loadChildren: () => import('./kpi/kpi.module').then((module) => module.AccountReportsKPIModule)
  },
  {
    path: 'warehouse',
    pathMatch: 'full',
    loadChildren: () =>
      import('./warehouse/warehouse.module').then((module) => module.AccountReportsWarehousePageModule)
  },
  {
    path: 'zero',
    pathMatch: 'full',
    loadChildren: () => import('./zero/zero.module').then((module) => module.AccountReportsZeroPageModule)
  },
  {
    path: 'general',
    pathMatch: 'full',
    loadChildren: () => import('./general/general.module').then((module) => module.AccountReportsGeneralModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountReportsPageRoutingModule {}
