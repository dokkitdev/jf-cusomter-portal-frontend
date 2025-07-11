import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReportService } from './report.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ReportService
  ]
})
export class ReportModule { }
