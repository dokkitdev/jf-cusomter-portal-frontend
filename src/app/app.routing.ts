import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthenticatedGuard } from '@ronas-it/angular-common';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [UnauthenticatedGuard],
    loadChildren: () => import('./public/public.module').then((module) => module.PublicModule)
  },
  {
    path: '**',
    loadChildren: () => import('./public/not-found/not-found.module').then((module) => module.PublicNotFoundPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
