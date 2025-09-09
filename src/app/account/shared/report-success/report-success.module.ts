import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '@app/shared/button';
import { ReportSuccessComponent } from './report-success.component';

@NgModule({
  declarations: [ReportSuccessComponent],
  imports: [CommonModule, TranslateModule, ButtonModule],
  exports: [ReportSuccessComponent]
})
export class ReportSuccessModule {}
