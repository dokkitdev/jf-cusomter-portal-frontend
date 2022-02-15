import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'account-admin-page',
  templateUrl: 'admin.html',
  styleUrls: ['admin.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAdminPageComponent {
  ngOnInit(): void {
    console.log('fff');
  }
}
