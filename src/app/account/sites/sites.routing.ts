import { AccountSitesPageComponent } from './sites.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AccountSitesPageComponent
  },
  {
    path: ':id',
    loadChildren: () => import('./view/view.module').then((module) => module.AccountSitesViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSitesPageRoutingModule { }
