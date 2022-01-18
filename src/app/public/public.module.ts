import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PublicComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
