import { CommonModule } from '@angular/common';
import { CustomSelectComponent } from './custom-select.component';
import { DropdownModule } from '../dropdown/dropdown.module';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgForTrackByPropertyModule } from '@shared/ng-for-track-by-property';
import { ValidationErrorsModule } from '@shared/validation-errors';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CustomSelectOptionComponent } from './components/option/option.component';
import { CustomSelectNotFoundComponent } from './components/not-found/not-found.component';
import { CustomSelectTriggerComponent } from './components/trigger/trigger.component';
import { LoadingSpinnerModule } from '@shared/loading-spinner';
import { ReactiveComponentModule } from '@ngrx/component';
import { CustomSelectFilterComponent } from './components/filter/filter.component';

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
    ReactiveComponentModule
  ],
  declarations: [
    CustomSelectComponent,
    CustomSelectTriggerComponent,
    CustomSelectOptionComponent,
    CustomSelectNotFoundComponent,
    CustomSelectFilterComponent
  ],
  exports: [
    CustomSelectComponent
  ]
})
export class CustomSelectModule { }
