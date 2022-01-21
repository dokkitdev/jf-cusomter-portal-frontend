import { ClassGroup } from '@shared/class-group';
import { Exclude, Expose } from 'class-transformer';

export class Contact {
  @Expose({ groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ groups: [ClassGroup.MAIN, ClassGroup.CREATING, ClassGroup.UPDATING] })
  public title: string;

  @Expose({ groups: [ClassGroup.MAIN] })
  public name: string;

  @Expose({ name: 'given_name', groups: [ClassGroup.MAIN, ClassGroup.CREATING, ClassGroup.UPDATING] })
  public givenName: string;

  @Expose({ name: 'family_name', groups: [ClassGroup.MAIN, ClassGroup.CREATING, ClassGroup.UPDATING] })
  public familyName: string;

  @Expose({ groups: [ClassGroup.MAIN, ClassGroup.CREATING, ClassGroup.UPDATING] })
  public email: string;

  @Expose({ groups: [ClassGroup.MAIN, ClassGroup.CREATING, ClassGroup.UPDATING] })
  public position: string;

  @Expose({ name: 'contact_id', groups: [ClassGroup.MAIN] })
  public contactID: number;

  @Expose({ name: 'simpro_site_id', groups: [ClassGroup.MAIN, ClassGroup.CREATING] })
  public simproSiteID: number;

  @Expose({ name: 'is_primary', groups: [ClassGroup.MAIN] })
  public isPrimary: boolean;

  @Expose({ name: 'work_phone', groups: [ClassGroup.MAIN, ClassGroup.CREATING, ClassGroup.UPDATING] })
  public workPhone: string;

  @Expose({ name: 'cell_phone', groups: [ClassGroup.MAIN, ClassGroup.CREATING, ClassGroup.UPDATING] })
  public cellPhone: string;

  @Exclude()
  public get fullName(): string {
    return `${this.givenName || ''} ${this.familyName || ''}`;
  }

  constructor(model: Partial<Contact> = {}) {
    Object.assign(this, model);
  }
}
