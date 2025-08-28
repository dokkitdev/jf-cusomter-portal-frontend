import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ParsingLog } from '@shared/notify';
import { configuration } from '@configurations';

@Component({
  selector: 'admin-logs-parsing-logs-item',
  templateUrl: 'parsing-logs-item.html',
  styleUrls: ['parsing-logs-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountAdminLogsParsingLogsItemComponent {
  @Input() item: ParsingLog;

  public get dateFormat(): string {
    return configuration.dateFormats.documentDate;
  }

  public openLogsDetailsDialog(): void {
    // TODO: Implement logs details dialog
    console.log('Opening logs details for:', this.item);
  }
}
