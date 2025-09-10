import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountReportsAssetPageComponent } from './asset.component';

const routes: Routes = [
  {
    path: '',
    component: AccountReportsAssetPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountReportsAssetPageRoutingModule {}
