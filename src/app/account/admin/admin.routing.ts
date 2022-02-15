import { AccountAdminPageComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AccountAdminPageComponent,
    pathMatch: 'full',
    redirectTo: 'users'
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then((module) => module.AccountAdminUsersPageModule)
  },
  {
    path: 'documents',
    loadChildren: () => import('./documents/documents.module').then((module) => module.AccountAdminDocumentsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountAdminPageRoutingModule { }
