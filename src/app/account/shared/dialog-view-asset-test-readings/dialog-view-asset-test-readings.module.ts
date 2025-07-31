import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountDialogViewAssetTestReadingsComponent } from './dialog-view-asset-test-readings.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { TableContainerModule } from '@shared/table-container';
import { AccountDialogViewAssetTestReadingsItemsHeaderComponent } from './components/items-header/items-header.component';
import { AccountDialogViewAssetTestReadingsItemComponent } from './components/item/item.component';
import { AccountDialogViewAssetTestReadingsItemsComponent } from './components/items/items.component';
import { ButtonModule } from '@shared/button';

@NgModule({
  declarations: [
    AccountDialogViewAssetTestReadingsComponent,
    AccountDialogViewAssetTestReadingsItemComponent,
    AccountDialogViewAssetTestReadingsItemsComponent,
    AccountDialogViewAssetTestReadingsItemsHeaderComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    NgForTrackByPropertyModule,
    TableContainerModule,
    ButtonModule
  ],
  exports: [AccountDialogViewAssetTestReadingsComponent]
})
export class AccountDialogViewAssetTestReadingsModule {}
