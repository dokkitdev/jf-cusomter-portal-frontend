import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reports-general-header',
  templateUrl: 'header.html',
  styleUrls: ['header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountReportsGeneralHeaderComponent {
  // Header component for general reports page
}
