import { Expose } from 'class-transformer';
import { ClassGroup } from '@shared/class-group';

export class JobRequest {
  @Expose({ name: 'site_id', groups: [ClassGroup.MAIN, ClassGroup.CREATING] })
  public simproSiteID: number;

  @Expose({ groups: [ClassGroup.MAIN, ClassGroup.CREATING] })
  public name: string;

  @Expose({ groups: [ClassGroup.MAIN, ClassGroup.CREATING] })
  public description: string;

  @Expose({ groups: [ClassGroup.MAIN, ClassGroup.CREATING] })
  public files: Array<File>;

  constructor(model: Partial<JobRequest> = {}) {
    Object.assign(this, model);
  }
}
