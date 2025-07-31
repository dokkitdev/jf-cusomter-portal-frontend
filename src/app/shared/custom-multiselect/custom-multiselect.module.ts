import { CommonModule } from '@angular/common';
import { CustomMultiselectComponent } from './custom-multiselect.component';
import { DropdownModule } from '../dropdown/dropdown.module';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { ValidationErrorsModule } from '@shared/validation-errors';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CustomMultiselectOptionComponent } from './components/option/option.component';
import { CustomMultiselectNotFoundComponent } from './components/not-found/not-found.component';
import { CustomMultiselectTriggerComponent } from './components/trigger/trigger.component';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { LetDirective, PushPipe } from '@ngrx/component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    DropdownModule,
    NgrxFormsModule,
    NgForTrackByPropertyModule,
    ValidationErrorsModule,
    InfiniteScrollModule,
    LoadingSpinnerModule,
    LetDirective,
    PushPipe
  ],
  declarations: [
    CustomMultiselectComponent,
    CustomMultiselectTriggerComponent,
    CustomMultiselectOptionComponent,
    CustomMultiselectNotFoundComponent
  ],
  exports: [CustomMultiselectComponent]
})
export class CustomMultiselectModule {}
