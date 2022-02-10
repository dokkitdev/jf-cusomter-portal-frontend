import { IsAdminGuard } from '@shared/user';
import { AccountComponent } from './account.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'sites',
        loadChildren: () => import('./sites/sites.module').then((module) => module.AccountSitesPageModule)
      },
      {
        path: 'admin',
        canActivate: [IsAdminGuard],
        loadChildren: () => import('./admin/admin.module').then((module) => module.AccountAdminPageModule)
      },
      {
        path: 'documents',
        loadChildren: () => import('./documents/documents.module').then((module) => module.AccountDocumentsPageModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module').then((module) => module.AccountReportsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
