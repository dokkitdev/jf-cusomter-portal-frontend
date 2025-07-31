import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SiteService } from './site.service';

@NgModule({
  imports: [CommonModule],
  providers: [SiteService]
})
export class SiteModule {}
