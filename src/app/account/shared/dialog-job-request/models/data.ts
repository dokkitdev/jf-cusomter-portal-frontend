export class AccountDialogJobRequestData {
  public siteID: number;

  constructor(model: Partial<AccountDialogJobRequestData> = {}) {
    Object.assign(this, model);
  }
}
