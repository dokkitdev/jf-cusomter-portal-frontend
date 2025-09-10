import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountReportsAssetPageComponent } from './asset.component';
import { AccountReportsAssetPageRoutingModule } from './asset.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountReportsAssetPageFacade } from './asset.facade';
import { ComponentStore } from '@ngrx/component-store';
import { AccountReportsAssetFormComponent } from './shared/components/form/form.component';
import { AccountReportsAssetTableComponent } from './shared/components/table/table.component';
import { LetDirective, PushPipe } from '@ngrx/component';
import { ButtonModule } from '@shared/button';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { NotificationModule } from '@shared/notification';
import { NgrxFormsModule } from 'ngrx-forms';
import { CustomSelectModule } from '@shared/custom-select';
import { CustomMultiselectModule } from '@shared/custom-multiselect';
import { TableContainerModule } from '@shared/table-container';
import { HeaderSortModule } from '@shared/header-sort';
import { PaginationElementsModule } from '@shared/pagination-elements';

@NgModule({
  declarations: [AccountReportsAssetPageComponent, AccountReportsAssetFormComponent, AccountReportsAssetTableComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountReportsAssetPageRoutingModule,
    NgrxFormsModule,
    CustomSelectModule,
    CustomMultiselectModule,
    TableContainerModule,
    HeaderSortModule,
    PaginationElementsModule,
    LetDirective,
    PushPipe,
    NotificationModule,
    LoadingSpinnerModule,
    ButtonModule
  ],
  providers: [AccountReportsAssetPageFacade, ComponentStore]
})
export class AccountReportsAssetPageModule {}
