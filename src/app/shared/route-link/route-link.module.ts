import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteLinkComponent } from './route-link.component';

@NgModule({
  declarations: [
    RouteLinkComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    RouteLinkComponent
  ]
})
export class RouteLinkModule { }
