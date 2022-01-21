import { ClassGroup } from '@shared/class-group';
import { Contact } from '@shared/contact';
import { Customer } from '@shared/customer';
import { Expose, Type } from 'class-transformer';

export class Site {
  @Expose({ groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ groups: [ClassGroup.MAIN, ClassGroup.UPDATING] })
  public name: string;

  @Expose({ name: 'site_id', groups: [ClassGroup.MAIN] })
  public siteID: number;

  @Expose({ groups: [ClassGroup.MAIN, ClassGroup.UPDATING] })
  public address: string;

  @Expose({ groups: [ClassGroup.MAIN, ClassGroup.UPDATING] })
  public city: string;

  @Expose({ groups: [ClassGroup.MAIN, ClassGroup.UPDATING] })
  public county: string;

  @Expose({ name: 'postal_code', groups: [ClassGroup.MAIN, ClassGroup.UPDATING] })
  public postalCode: string;

  @Expose({ name: 'primary_site_contact_id', groups: [ClassGroup.MAIN, ClassGroup.UPDATING] })
  public primaryContactID: number;

  @Expose({ name: 'open_jobs_count', groups: [ClassGroup.MAIN] })
  public openJobsCount?: number;

  @Type(() => Customer)
  @Expose({ name: 'simpro_customer', groups: [ClassGroup.MAIN] })
  public simproCustomer?: Customer;

  @Type(() => Contact)
  @Expose({ name: 'site_contacts', groups: [ClassGroup.MAIN] })
  public contacts?: Array<Contact>;

  @Type(() => Contact)
  @Expose({ name: 'primary_site_contact', groups: [ClassGroup.MAIN] })
  public primaryContact?: Contact;

  constructor(model: Partial<Site> = {}) {
    Object.assign(this, model);
  }
}
