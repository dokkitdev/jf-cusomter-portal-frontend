import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { configuration } from '@configurations';
import { Report } from '@shared/report';
import { SpinnerDiameter } from '@shared/loading-spinner';
import { AccountReportsPageFacade } from '@app/account/reports/reports.facade';

@Component({
  selector: 'reports-item',
  templateUrl: 'item.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountReportsItemComponent {
  @Input() item: Report;

  public spinnerDiameter: typeof SpinnerDiameter;
  public dateFormat: string;

  constructor(
    private facade: AccountReportsPageFacade
  ) {
    this.spinnerDiameter = SpinnerDiameter;
    this.dateFormat = configuration.dateFormats.reportDate;
  }

  public downloadMediaClicked(): void {
    if (this.item.media) {
      this.facade.downloadMedia(this.item.media);
    }
  }
}
