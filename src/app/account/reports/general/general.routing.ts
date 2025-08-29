import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountReportsGeneralComponent } from './general.component';

const routes: Routes = [
  {
    path: '',
    component: AccountReportsGeneralComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountReportsGeneralRoutingModule {}
