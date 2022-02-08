import { ApiService } from '@ronas-it/angular-common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { classToPlain, plainToClass, plainToClassFromExist } from 'class-transformer';
import { ClassGroup } from '@shared/class-group';
import { Job, JobCostCenter, JobFilters, JobPaginationRequest, JobRequest, JobStatus } from './models';
import { HttpResponse } from '@angular/common/http';
import { JobSortField } from './enums';
import { JobCountRelationType, JobRelationType } from './types';
import { PaginationResponse } from '@shared/pagination';
import { isUndefined, omitBy } from 'lodash';

@Injectable()
export class JobService {
  public endpoint: string;

  constructor(
    private apiService: ApiService
  ) {
    this.endpoint = '/jobs';
  }

  public search({ page, perPage, orderBy, desc, relations, countRelations, filters }: {
    page?: number,
    perPage?: number,
    orderBy?: JobSortField,
    desc?: boolean,
    relations?: Array<JobRelationType>,
    countRelations?: Array<JobCountRelationType>,
    filters?: JobFilters
  } = {}): Observable<PaginationResponse<Job>> {
    const request = new JobPaginationRequest({ ...filters, page, perPage, orderBy, desc, relations, countRelations });

    return this.apiService
      .get<PaginationResponse<Job>>(this.endpoint, omitBy(classToPlain<JobPaginationRequest>(request), isUndefined))
      .pipe(
        map((response) => plainToClassFromExist(
          new PaginationResponse<Job>(Job), response, { groups: [ClassGroup.MAIN] })
        )
      );
  }

  public getCostCenters(): Observable<Array<JobCostCenter>> {
    return this.apiService
      .get(`${this.endpoint}/cost-centers`)
      .pipe(
        map((response) => plainToClass(JobCostCenter, response, { groups: [ClassGroup.MAIN] }))
      );
  }

  public getStatuses(): Observable<Array<JobStatus>> {
    return this.apiService
      .get(`${this.endpoint}/statuses`)
      .pipe(
        map((response) => plainToClass(JobStatus, response, { groups: [ClassGroup.MAIN] }))
      );
  }

  public downloadAttachment(id: number): Observable<Blob> {
    return this.apiService
      .get<HttpResponse<Blob>>(`/job-attachments/download/${id}`, {}, {
        responseType: 'blob',
        observe: 'response'
      })
      .pipe(
        map((response) => response.body as Blob)
      );
  }

  public createRequest(request: JobRequest): Observable<void> {
    const requestObject = classToPlain(request, { groups: [ClassGroup.CREATING] });
    requestObject.files = request.files;

    return this.apiService.post(`${this.endpoint}/create-in-simpro`, requestObject);
  }
}
