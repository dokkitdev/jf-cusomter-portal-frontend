import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountReportsServiceControlPageComponent } from './service-control.component';
import { AccountReportsServiceControlPageRoutingModule } from './service-control.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountReportsServiceControlPageFacade } from './service-control.facade';
import { AccountReportsServiceControlItemsComponent } from './shared/components/items/items.component';
import { AccountReportsServiceControlItemComponent } from './shared/components/item/item.component';
import { AccountReportsServiceControlItemsHeaderComponent } from './shared/components/items-header/items-header.component';
import { AccountReportsServiceControlHeaderComponent } from './shared/components/header/header.component';
import { AccountReportsServiceControlFiltersComponent } from './shared/components/filters/filters.component';

@NgModule({
  declarations: [
    AccountReportsServiceControlPageComponent,
    AccountReportsServiceControlItemsComponent,
    AccountReportsServiceControlItemComponent,
    AccountReportsServiceControlItemsHeaderComponent,
    AccountReportsServiceControlHeaderComponent,
    AccountReportsServiceControlFiltersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountReportsServiceControlPageRoutingModule
  ],
  providers: [
    AccountReportsServiceControlPageFacade
  ]
})
export class AccountReportsServiceControlPageModule { }
