import { AuthCredentials as CommonAuthCredentials } from '@ronas-it/angular-common';
import { Expose } from 'class-transformer';

export class AuthCredentials extends CommonAuthCredentials {
  @Expose({ name: '2fa_code' })
  public code: string;

  constructor(model: Partial<AuthCredentials> = {}) {
    super(model);

    Object.assign(this, model);
  }
}
