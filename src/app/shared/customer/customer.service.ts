import { ApiService } from '@ronas-it/angular-common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationResponse } from '@shared/pagination';
import { classToPlain, plainToClass, plainToClassFromExist } from 'class-transformer';
import { ClassGroup } from '@shared/class-group';
import { Customer, CustomerFilters, CustomerPaginationRequest } from './models';
import { isUndefined, omitBy } from 'lodash';
import { CustomerSortField } from './enums';

@Injectable()
export class CustomerService {
  public endpoint: string;

  constructor(
    private apiService: ApiService
  ) {
    this.endpoint = '/simpro-customers';
  }

  public search({ page, perPage, orderBy, desc, filters }: {
    page?: number,
    perPage?: number,
    orderBy?: CustomerSortField,
    desc?: boolean,
    filters?: CustomerFilters
  } = {}): Observable<PaginationResponse<Customer>> {
    const request = new CustomerPaginationRequest({ ...filters, page, perPage, orderBy, desc });

    return this.apiService
      .get<PaginationResponse<Customer>>(this.endpoint, omitBy(classToPlain<CustomerPaginationRequest>(request), isUndefined))
      .pipe(
        map((response) => plainToClassFromExist(
          new PaginationResponse<Customer>(Customer), response, { groups: [ClassGroup.MAIN] })
        )
      );
  }

  public get(id: number): Observable<Customer> {
    return this.apiService
      .get<Customer>(`${this.endpoint}/${id}`)
      .pipe(
        map((response) => plainToClass(Customer, response, { groups: [ClassGroup.MAIN] }))
      );
  }
}
