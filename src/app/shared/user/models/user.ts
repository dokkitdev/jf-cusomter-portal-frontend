import { Customer } from './../../customer/models/customer';
import { AbstractUser } from '@ronas-it/angular-common';
import { Expose, Type } from 'class-transformer';
import { ClassGroup } from '@shared/class-group';
import { UserRole } from '../enums';

export class User extends AbstractUser {
  @Type(() => Number)
  @Expose({ groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ name: 'role_id', groups: [ClassGroup.MAIN, ClassGroup.CREATING, ClassGroup.UPDATING] })
  public roleID: UserRole;

  @Expose({ groups: [ClassGroup.MAIN, ClassGroup.CREATING, ClassGroup.UPDATING] })
  public name: string;

  @Expose({ groups: [ClassGroup.MAIN, ClassGroup.CREATING, ClassGroup.UPDATING] })
  public email: string;

  @Expose({ groups: [ClassGroup.MAIN] })
  @Type(() => Customer)
  public customers?: Array<Customer>;

  @Expose({ name: 'customer_ids', groups: [ClassGroup.MAIN, ClassGroup.CREATING, ClassGroup.UPDATING] })
  public customerIDs: Array<number>;

  @Expose({ name: 'is_send_email', groups: [ClassGroup.MAIN, ClassGroup.CREATING] })
  public isSendEmail: boolean;

  @Expose({ groups: [ClassGroup.UPDATING] })
  public password: string;

  @Expose({ name: 'old_password', groups: [ClassGroup.UPDATING] })
  public oldPassword: string;

  @Expose({ name: 'password_confirmation', groups: [ClassGroup.UPDATING] })
  public passwordConfirmation: string;

  constructor(model: Partial<User> = {}) {
    super();

    Object.assign(this, model);
  }
}
