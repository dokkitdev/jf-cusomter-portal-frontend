import { NotifySystemLogsSortField } from '@shared/notify/type/system-logs-sort-field';
import { NotifyParsingLogsSortField } from '@shared/notify/type/parsing-logs-sort-field';

export class AccountAdminLogsQueryParameters {
  public page: number;
  public perPage: number;
  public orderBy: NotifySystemLogsSortField | NotifyParsingLogsSortField;
  public desc: boolean;

  constructor(model: Partial<AccountAdminLogsQueryParameters> = {}) {
    Object.assign(this, model);
  }
}
