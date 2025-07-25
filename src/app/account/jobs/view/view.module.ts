import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountJobsViewPageComponent } from './view.component';
import { AccountJobsViewPageRoutingModule } from './view.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccountJobsViewPageFacade } from './view.facade';
import { LetModule, PushModule } from '@ngrx/component';
import { JobModule } from '@shared/job';
import { AccountJobsViewInfoComponent } from './shared/components/info/info.component';
import { AccountJobsViewEngineersComponent } from './shared/components/engineers/engineers.component';
import { AccountJobsViewEngineersItemComponent } from './shared/components/engineers-item/engineers-item.component';
import { AccountJobsViewEngineersItemsHeaderComponent } from './shared/components/engineers-items-header/engineers-items-header.component';
import { AccountJobsViewNotesComponent } from './shared/components/notes/notes.component';
import { AccountJobsViewNotesItemComponent } from './shared/components/notes-item/notes-item.component';
import { AccountJobsViewAttachmentsComponent } from './shared/components/attachments/attachments.component';
import { ComponentStore } from '@ngrx/component-store';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { FileModule } from '@shared/file';
import { CollapsableModule } from '@shared/collapsable';
import { SnakeModule } from '@shared/snake';
import { NavigationModule } from '@shared/navigation';
import { PropertyModule } from '@shared/property';
import { SectionModule } from '@shared/section';

@NgModule({
  declarations: [
    AccountJobsViewPageComponent,
    AccountJobsViewInfoComponent,
    AccountJobsViewEngineersComponent,
    AccountJobsViewEngineersItemComponent,
    AccountJobsViewEngineersItemsHeaderComponent,
    AccountJobsViewNotesComponent,
    AccountJobsViewNotesItemComponent,
    AccountJobsViewAttachmentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountJobsViewPageRoutingModule,
    LetModule, PushModule,
    JobModule,
    FileModule,
    LoadingSpinnerModule,
    NgForTrackByPropertyModule,
    CollapsableModule,
    SnakeModule,
    NavigationModule,
    PropertyModule,
    SectionModule
  ],
  providers: [
    AccountJobsViewPageFacade,
    ComponentStore
  ]
})
export class AccountJobsViewPageModule { }
