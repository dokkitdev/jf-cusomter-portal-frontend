import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountAssetTestsComponent } from './asset-tests.component';
import { TranslateModule } from '@ngx-translate/core';
import { AccountAssetTestsItemComponent } from './components/item/item.component';
import { AccountAssetTestsItemsComponent } from './components/items/items.component';
import { AccountAssetTestsItemsHeaderComponent } from './components/items-header/items-header.component';
import { LetDirective, PushPipe } from '@ngrx/component';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { HeaderSortModule } from '@shared/header-sort';
import { TableContainerModule } from '@shared/table-container';
import { DialogModule } from '@shared/dialog';
import { RouterModule } from '@angular/router';
import { AccountDialogViewAssetTestReadingsModule } from '../dialog-view-asset-test-readings';
import { SnakeModule } from '@shared/snake';

@NgModule({
  declarations: [
    AccountAssetTestsComponent,
    AccountAssetTestsItemComponent,
    AccountAssetTestsItemsComponent,
    AccountAssetTestsItemsHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    LetDirective, PushPipe,
    NgForTrackByPropertyModule,
    HeaderSortModule,
    TableContainerModule,
    DialogModule,
    AccountDialogViewAssetTestReadingsModule,
    SnakeModule
  ],
  exports: [
    AccountAssetTestsComponent
  ]
})
export class AccountAssetTestsModule { }
