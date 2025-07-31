import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLoginConfirmationPageComponent } from './login-confirmation.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLoginConfirmationPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicLoginConfirmationPageRoutingModule {}
