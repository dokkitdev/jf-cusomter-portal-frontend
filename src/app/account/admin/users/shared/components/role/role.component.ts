import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { User, UserRole } from '@shared/user';

@Component({
    selector: 'admin-users-role',
    templateUrl: 'role.html',
    styleUrls: ['role.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountAdminUsersRoleComponent {
  @Input() item: User;

  public get userRole(): typeof UserRole {
    return UserRole;
  }
}
