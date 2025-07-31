import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountCustomAssetTypeMultiselectComponent } from './custom-asset-type-multiselect.component';
import { TranslateModule } from '@ngx-translate/core';
import { CustomMultiselectModule } from '@shared/custom-multiselect';

@NgModule({
  declarations: [AccountCustomAssetTypeMultiselectComponent],
  imports: [CommonModule, TranslateModule, CustomMultiselectModule],
  exports: [AccountCustomAssetTypeMultiselectComponent]
})
export class AccountCustomAssetTypeMultiselectModule {}
