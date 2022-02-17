import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountAssetTestResultSelectComponent } from './asset-test-result-select.component';
import { CustomSelectModule } from '@shared/custom-select';

@NgModule({
  declarations: [
    AccountAssetTestResultSelectComponent
  ],
  imports: [
    CommonModule,
    CustomSelectModule
  ],
  exports: [
    AccountAssetTestResultSelectComponent
  ]
})
export class AccountAssetTestResultSelectModule { }
