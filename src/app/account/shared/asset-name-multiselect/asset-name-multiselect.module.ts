import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountAssetNameMultiselectComponent } from './asset-name-multiselect.component';
import { TranslateModule } from '@ngx-translate/core';
import { CustomMultiselectModule } from '@shared/custom-multiselect';

@NgModule({
  declarations: [AccountAssetNameMultiselectComponent],
  imports: [CommonModule, TranslateModule, CustomMultiselectModule],
  exports: [AccountAssetNameMultiselectComponent]
})
export class AccountAssetNameMultiselectModule {}
