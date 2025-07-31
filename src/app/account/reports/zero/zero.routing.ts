import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountReportsZeroPageComponent } from './zero.component';

const routes: Routes = [
  {
    path: '',
    component: AccountReportsZeroPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountReportsZeroPageRoutingModule {}
