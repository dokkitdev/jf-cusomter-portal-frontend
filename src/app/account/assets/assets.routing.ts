import { AccountAssetsPageComponent } from './assets.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AccountAssetsPageComponent
  },
  {
    path: ':id',
    loadChildren: () => import('./view/view.module').then((module) => module.AccountAssetsViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountAssetsPageRoutingModule { }
