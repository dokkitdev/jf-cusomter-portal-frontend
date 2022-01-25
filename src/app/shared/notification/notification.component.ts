import { ChangeDetectionStrategy, Component } from '@angular/core';
import { notificationAnimation } from './notification.animation';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  selector: '[notification-component]',
  templateUrl: 'notification.html',
  styleUrls: ['notification.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: notificationAnimation
})
export class NotificationComponent extends Toast {
  constructor(
    public toastrService: ToastrService,
    public toastPackage: ToastPackage
  ) {
    super(toastrService, toastPackage);
  }
}
