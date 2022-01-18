import { AccountAdminPageComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AccountAdminPageComponent
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then((module) => module.AccountAdminUsersPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountAdminPageRoutingModule { }
