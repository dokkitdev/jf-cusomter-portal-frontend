import { ClassGroup } from '@shared/class-group';
import { Expose } from 'class-transformer';

export class JobCatalog {
  @Expose({ groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ groups: [ClassGroup.MAIN] })
  public name: string;

  @Expose({ name: 'job_id', groups: [ClassGroup.MAIN] })
  public jobID: number;

  @Expose({ name: 'qty', groups: [ClassGroup.MAIN] })
  public quantity: number;

  constructor(model: Partial<JobCatalog> = {}) {
    Object.assign(this, model);
  }
}
