import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountTemplatesPageComponent } from './templates.component';

const routes: Routes = [
  {
    path: '',
    component: AccountTemplatesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountTemplatesPageRoutingModule {}
