import { DialogActionEnum } from '../enums';

export class DialogResult {
  public type: DialogActionEnum;
  public status: boolean;
  public error?: any;

  constructor(model: Partial<DialogResult> = {}) {
    Object.assign(this, model);
  }
}
