import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountSiteContactsComponent } from './site-contacts.component';
import { TranslateModule } from '@ngx-translate/core';
import { AccountSiteContactsHeaderComponent } from './components/header/header.component';
import { AccountSiteContactsItemComponent } from './components/item/item.component';
import { AccountSiteContactsItemsComponent } from './components/items/items.component';
import { AccountSiteContactsItemsHeaderComponent } from './components/items-header/items-header.component';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { HeaderSortModule } from '@shared/header-sort';
import { TableContainerModule } from '@shared/table-container';
import { DialogModule } from '@shared/dialog';
import { AccountDialogEditContactModule } from '../dialog-edit-contact';

@NgModule({
  declarations: [
    AccountSiteContactsComponent,
    AccountSiteContactsHeaderComponent,
    AccountSiteContactsItemComponent,
    AccountSiteContactsItemsComponent,
    AccountSiteContactsItemsHeaderComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveComponentModule,
    NgForTrackByPropertyModule,
    HeaderSortModule,
    TableContainerModule,
    DialogModule,
    AccountDialogEditContactModule
  ],
  exports: [
    AccountSiteContactsComponent
  ]
})
export class AccountSiteContactsModule { }
