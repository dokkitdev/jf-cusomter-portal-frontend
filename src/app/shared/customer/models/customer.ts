import { ClassGroup } from '@shared/class-group';
import { Expose } from 'class-transformer';

export class Customer {
  @Expose({ groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ groups: [ClassGroup.MAIN] })
  public name: string;

  @Expose({ name: 'customer_id', groups: [ClassGroup.MAIN] })
  public customerID: number;

  constructor(model: Partial<Customer> = {}) {
    Object.assign(this, model);
  }
}
