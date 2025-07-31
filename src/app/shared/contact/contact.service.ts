import { ApiService } from '@ronas-it/angular-common';
import { Injectable } from '@angular/core';
import { Contact } from './models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { classToPlain, plainToClass } from 'class-transformer';
import { ClassGroup } from '@shared/class-group';

@Injectable()
export class ContactService {
  public endpoint: string;

  constructor(private apiService: ApiService) {
    this.endpoint = '/site-contacts';
  }

  public create(contact: Contact): Observable<Contact> {
    return this.apiService
      .post<Contact>(this.endpoint, classToPlain(contact, { groups: [ClassGroup.CREATING] }))
      .pipe(map((response) => plainToClass(Contact, response, { groups: [ClassGroup.MAIN] })));
  }

  public update(contact: Contact): Observable<void> {
    return this.apiService.put(
      `${this.endpoint}/${contact.id}`,
      classToPlain(contact, { groups: [ClassGroup.UPDATING] })
    );
  }

  public delete(id: number): Observable<void> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }
}
