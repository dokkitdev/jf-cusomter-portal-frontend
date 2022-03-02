import { CustomSelectModule } from '@shared/custom-select';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountCustomAssetTypeSelectComponent } from './custom-asset-type-select.component';
import { TranslateModule } from '@ngx-translate/core';
import { AssetModule } from '@shared/asset';

@NgModule({
  declarations: [
    AccountCustomAssetTypeSelectComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AssetModule,
    CustomSelectModule
  ],
  exports: [
    AccountCustomAssetTypeSelectComponent
  ]
})
export class AccountCustomAssetTypeSelectModule { }
