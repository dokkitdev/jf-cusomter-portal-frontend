import { ClassGroup } from '@shared/class-group';
import { Expose } from 'class-transformer';

export class RestorePasswordRequest {
  @Expose({ groups: [ClassGroup.MAIN] })
  public token: string;

  @Expose({ groups: [ClassGroup.MAIN] })
  public password: string;

  constructor(model: Partial<RestorePasswordRequest> = {}) {
    Object.assign(this, model);
  }
}
