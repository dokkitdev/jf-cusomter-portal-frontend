import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CsvReport } from '@shared/notify';

@Component({
  selector: 'reports-general-item',
  templateUrl: 'item.html',
  styleUrls: ['item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountReportsGeneralItemComponent {
  @Input() item: CsvReport;
  @Output() downloadClicked = new EventEmitter<CsvReport>();

  public onDownloadClicked(item: CsvReport): void {
    this.downloadClicked.emit(item);
  }
}
