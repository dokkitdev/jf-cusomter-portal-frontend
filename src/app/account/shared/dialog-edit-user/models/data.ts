import { User } from '@shared/user';

export class AccountDialogEditUserData {
  public isEditMode: boolean;
  public user: User;

  constructor(model: Partial<AccountDialogEditUserData> = {}) {
    Object.assign(this, model);
  }
}
