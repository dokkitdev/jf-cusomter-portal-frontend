export class DialogConfirmationConfig {
  public title: string;
  public text?: string;
  public confirmButtonText?: string;
  public cancelButtonText?: string;
  public resultData?: any;

  constructor(model: Partial<DialogConfirmationConfig> = {}) {
    Object.assign(this, model);
  }
}
