import { CommonModule } from '@angular/common';
import { NavigationService } from './navigation.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    NavigationService
  ]
})
export class NavigationModule { }
