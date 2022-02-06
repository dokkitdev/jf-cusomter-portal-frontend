import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { NotificationComponent } from '@shared/notification';
import { IndividualConfig } from 'ngx-toastr/toastr/toastr-config';

@Injectable()
export class NotificationService {
  constructor(
    private toastr: ToastrService
  ) { }

  public success(message: string, config: Partial<IndividualConfig> = {}): ActiveToast<NotificationComponent> {
    return this.toastr.success(message, undefined, config);
  }

  public error(message: string, config: Partial<IndividualConfig> = {}): ActiveToast<NotificationComponent> {
    return this.toastr.error(message, undefined, config);
  }
}
