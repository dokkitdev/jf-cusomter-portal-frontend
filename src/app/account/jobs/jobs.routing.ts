import { AccountJobsPageComponent } from './jobs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AccountJobsPageComponent
  },
  {
    path: ':id',
    loadChildren: () => import('./view/view.module').then((module) => module.AccountJobsViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountJobsPageRoutingModule {}
