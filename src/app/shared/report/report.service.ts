import { ApiService } from '@ronas-it/angular-common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationResponse } from '@shared/pagination';
import { instanceToPlain, plainToClass, plainToClassFromExist } from 'class-transformer';
import { ClassGroup } from '@shared/class-group';
import { Report, ReportPaginationRequest, ReportFilters } from './models';
import { ReportRelationType } from './types';
import { ReportSortField } from './enums';
import { isUndefined, omitBy } from 'lodash';

@Injectable()
export class ReportService {
  public endpoint: string;

  constructor(
    private apiService: ApiService
  ) {
    this.endpoint = '/report-logs';
  }

  public search({ page, perPage, orderBy, desc, relations, filters }: {
    page?: number,
    perPage?: number,
    orderBy?: ReportSortField,
    desc?: boolean,
    relations?: Array<ReportRelationType>,
    filters?: ReportFilters
  } = {}): Observable<PaginationResponse<Report>> {
    const request = new ReportPaginationRequest({ ...filters, page, perPage, orderBy, desc, relations });

    return this.apiService
      .get<PaginationResponse<Report>>(this.endpoint, omitBy(instanceToPlain<ReportPaginationRequest>(request), isUndefined))
      .pipe(
        map((response) => plainToClassFromExist(
          new PaginationResponse<Report>(Report), response, { groups: [ClassGroup.MAIN] })
        )
      );
  }

  public get(id: number, relations?: Array<ReportRelationType>): Observable<Report> {
    return this.apiService
      .get<Report>(`${this.endpoint}/${id}`, omitBy({ with: relations }, isUndefined))
      .pipe(
        map((response) => plainToClass(Report, response, { groups: [ClassGroup.MAIN] }))
      );
  }

  public create(document: Report): Observable<Report> {
    return this.apiService
      .post<Report>(this.endpoint, instanceToPlain(document, { groups: [ClassGroup.CREATING] }))
      .pipe(
        map((response) => plainToClass(Report, response, { groups: [ClassGroup.MAIN] }))
      );
  }

  public delete(id: number): Observable<void> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }
}
