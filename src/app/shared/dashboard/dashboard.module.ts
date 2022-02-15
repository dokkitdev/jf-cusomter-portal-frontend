import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardService } from './dashboard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }
