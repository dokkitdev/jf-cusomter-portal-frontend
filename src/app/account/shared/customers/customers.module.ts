import { CommonModule } from '@angular/common';
import { AccountCustomersComponent } from './customers.component';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { AccountCustomersItemComponent } from './components/item/item.component';
import { AccountCustomersItemAddComponent } from './components/item-add/item-add.component';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { AccountCustomerSelectModule } from '../customer-select';
import { AccountGroupSelectModule } from '../group-select';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AccountCustomersComponent,
    AccountCustomersItemComponent,
    AccountCustomersItemAddComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    NgrxFormsModule,
    ReactiveComponentModule,
    NgForTrackByPropertyModule,
    AccountCustomerSelectModule,
    AccountGroupSelectModule
  ],
  exports: [
    AccountCustomersComponent
  ]
})
export class AccountCustomersModule { }
