import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PublicNotFoundPageComponent } from './not-found.component';
import { PublicNotFoundPageRoutingModule } from './not-found.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PublicNotFoundPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    PublicNotFoundPageRoutingModule
  ],
  providers: []
})
export class PublicNotFoundPageModule { }
