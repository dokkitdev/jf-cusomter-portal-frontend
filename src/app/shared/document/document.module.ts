import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DocumentService } from './document.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DocumentService
  ]
})
export class DocumentModule { }
