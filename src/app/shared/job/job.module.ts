import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JobService } from './job.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    JobService
  ]
})
export class JobModule { }
