import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomerService } from './customer.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    CustomerService
  ]
})
export class CustomerModule { }
