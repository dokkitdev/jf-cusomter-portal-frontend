import { PublicComponent } from './public.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then(
            (module) => module.PublicLoginPageModule
          ),
      },
      {
        path: 'login-confirmation',
        loadChildren: () =>
          import('./login-confirmation/login-confirmation.module').then(
            (module) => module.PublicLoginConfirmationPageModule
          ),
      },
      {
        path: 'forgot-password',
        loadChildren: () =>
          import('./forgot-password/forgot-password.module').then(
            (module) => module.PublicForgotPasswordPageModule
          ),
      },
      {
        path: 'reset-password/:token',
        loadChildren: () =>
          import('./reset-password/reset-password.module').then(
            (module) => module.PublicResetPasswordPageModule
          ),
      },
      {
        path: 'add-password/:token',
        loadChildren: () =>
          import('./reset-password/reset-password.module').then(
            (module) => module.PublicResetPasswordPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
