import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { AccountSiteSelectComponent } from './site-select.component';
import { CustomSelectModule } from '@shared/custom-select';
import { SiteModule } from '@shared/site';

@NgModule({
  declarations: [AccountSiteSelectComponent],
  imports: [CommonModule, TranslateModule, CustomSelectModule, SiteModule],
  exports: [AccountSiteSelectComponent]
})
export class AccountSiteSelectModule {}
