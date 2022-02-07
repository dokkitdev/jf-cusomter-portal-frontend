import { ClassGroup } from '@shared/class-group';
import { Expose } from 'class-transformer';

export class JobAttachment {
  @Expose({ groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ groups: [ClassGroup.MAIN] })
  public name: string;

  @Expose({ name: 'job_id', groups: [ClassGroup.MAIN] })
  public jobID: number;

  @Expose({ name: 'simpro_attachment_id', groups: [ClassGroup.MAIN] })
  public attachmentID: string;

  constructor(model: Partial<JobAttachment> = {}) {
    Object.assign(this, model);
  }
}
