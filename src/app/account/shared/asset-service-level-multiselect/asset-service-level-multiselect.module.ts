import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountAssetServiceLevelMultiselectComponent } from './asset-service-level-multiselect.component';
import { CustomMultiselectModule } from '@shared/custom-multiselect';
import { AssetModule } from '@shared/asset';

@NgModule({
  declarations: [AccountAssetServiceLevelMultiselectComponent],
  imports: [CommonModule, CustomMultiselectModule, AssetModule],
  exports: [AccountAssetServiceLevelMultiselectComponent]
})
export class AccountAssetServiceLevelMultiselectModule {}
