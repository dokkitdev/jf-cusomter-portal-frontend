import { ClassGroup } from '@shared/class-group';
import { Expose } from 'class-transformer';

export class JobCostCenter {
  @Expose({ name: 'ID', groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ name: 'Name', groups: [ClassGroup.MAIN] })
  public name: string;

  constructor(model: Partial<JobCostCenter> = {}) {
    Object.assign(this, model);
  }
}
