import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountAssetsViewPageComponent } from './view.component';
import { AccountAssetsViewPageRoutingModule } from './view.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountAssetsViewPageFacade } from './view.facade';
import { LetDirective, PushPipe } from '@ngrx/component';
import { AssetModule } from '@shared/asset';
import { FileModule } from '@shared/file';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { NavigationModule } from '@shared/navigation';
import { PropertyModule } from '@shared/property';
import { SectionModule } from '@shared/section';
import { AccountAssetsViewInfoComponent } from './shared/components/info/info.component';
import { AccountAssetsViewCustomFieldsComponent } from './shared/components/custom-fields/custom-fields.component';
import { AccountAssetsViewAttachmentsComponent } from './shared/components/attachments/attachments.component';
import { SnakeModule } from '@shared/snake';
import { AccountAssetTestsModule } from '@app/account/shared/asset-tests';
import { ComponentStore } from '@ngrx/component-store';

@NgModule({
  declarations: [
    AccountAssetsViewPageComponent,
    AccountAssetsViewInfoComponent,
    AccountAssetsViewCustomFieldsComponent,
    AccountAssetsViewAttachmentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountAssetsViewPageRoutingModule,
    LetDirective,
    PushPipe,
    AssetModule,
    FileModule,
    LoadingSpinnerModule,
    NgForTrackByPropertyModule,
    NavigationModule,
    PropertyModule,
    SectionModule,
    SnakeModule,
    AccountAssetTestsModule
  ],
  providers: [AccountAssetsViewPageFacade, ComponentStore]
})
export class AccountAssetsViewPageModule {}
