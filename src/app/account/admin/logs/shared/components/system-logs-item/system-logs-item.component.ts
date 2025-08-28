import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { SystemLog } from '@shared/notify';
import { configuration } from '@configurations';

@Component({
  selector: 'admin-logs-system-logs-item',
  templateUrl: 'system-logs-item.html',
  styleUrls: ['system-logs-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountAdminLogsSystemLogsItemComponent {
  @Input() item: SystemLog;

  public get dateFormat(): string {
    return configuration.dateFormats.documentDate;
  }

  public openLettersClicked(): void {
    // TODO: Implement logs details dialog
    console.log('Opening logs details for:', this.item);
  }
}
