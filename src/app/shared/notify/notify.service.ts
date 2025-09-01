import { ApiService } from '@ronas-it/angular-common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { classToPlain, plainToClass, plainToClassFromExist } from 'class-transformer';
import { ClassGroup } from '@shared/class-group';
import { WarehouseReportRequest, LetterTemplateGroup, SystemLog, ParsingLog } from './models';
import { NotifyParsingLogsSortField, NotifySystemLogsSortField } from './type';
import { PaginationRequest, PaginationResponse } from '@shared/pagination';
import { isUndefined, omitBy } from 'lodash';
import { CsvReport } from '../../account/reports/general/shared/models/csv-report';

@Injectable()
export class NotifyService {
  private baseEndpoint: string;

  constructor(private apiService: ApiService) {
    this.baseEndpoint = '/notify';
  }

  public searchSystemLogs({
    page,
    perPage,
    orderBy,
    desc
  }: {
    page?: number;
    perPage?: number;
    orderBy?: NotifySystemLogsSortField;
    desc?: boolean;
  } = {}): Observable<PaginationResponse<SystemLog>> {
    const request = new PaginationRequest({
      page,
      perPage,
      orderBy,
      desc
    });

    return this.apiService
      .get<
        PaginationResponse<SystemLog>
      >(`${this.baseEndpoint}/reports`, omitBy(classToPlain<PaginationRequest>(request), isUndefined))
      .pipe(
        map((response) =>
          plainToClassFromExist(new PaginationResponse<SystemLog>(SystemLog), response, { groups: [ClassGroup.MAIN] })
        )
      );
  }

  public searchParsingLogs({
    page,
    perPage,
    orderBy,
    desc
  }: {
    page?: number;
    perPage?: number;
    orderBy?: NotifyParsingLogsSortField;
    desc?: boolean;
  } = {}): Observable<PaginationResponse<ParsingLog>> {
    const request = new PaginationRequest({
      page,
      perPage,
      orderBy,
      desc
    });

    return this.apiService
      .get<
        PaginationResponse<ParsingLog>
      >(`${this.baseEndpoint}/parsing-logs`, omitBy(classToPlain<PaginationRequest>(request), isUndefined))
      .pipe(
        map((response) =>
          plainToClassFromExist(new PaginationResponse<ParsingLog>(ParsingLog), response, { groups: [ClassGroup.MAIN] })
        )
      );
  }

  public searchCsvReports({
    page,
    perPage,
    orderBy,
    desc
  }: {
    page?: number;
    perPage?: number;
    orderBy?: string;
    desc?: boolean;
  } = {}): Observable<PaginationResponse<CsvReport>> {
    const request = new PaginationRequest({
      page,
      perPage,
      orderBy,
      desc
    });

    return this.apiService
      .get<
        PaginationResponse<CsvReport>
      >(`${this.baseEndpoint}/csv-reports`, omitBy(classToPlain<PaginationRequest>(request), isUndefined))
      .pipe(
        map((response) =>
          plainToClassFromExist(new PaginationResponse<CsvReport>(CsvReport), response, { groups: [ClassGroup.MAIN] })
        )
      );
  }

  public generateWarehouseReport(period: number): Observable<void> {
    const request = new WarehouseReportRequest(period);
    const requestBody = classToPlain(request, { groups: [ClassGroup.MAIN] });

    return this.apiService.post<void>(`${this.baseEndpoint}/reports/warehouse`, requestBody);
  }

  public getLetterTemplates(): Observable<Array<LetterTemplateGroup>> {
    return this.apiService
      .get<Array<LetterTemplateGroup>>(`${this.baseEndpoint}/letter-templates`)
      .pipe(
        map((response) =>
          response.map((group) => plainToClass(LetterTemplateGroup, group, { groups: [ClassGroup.MAIN] }))
        )
      );
  }

  public uploadLetterTemplate(templateName: string, file: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);

    return this.apiService.post<void>(`${this.baseEndpoint}/letter-templates/${templateName}/upload`, formData);
  }

  public downloadLetterTemplate(templateName: string): Observable<Blob> {
    return this.apiService
      .get<HttpResponse<Blob>>(
        `${this.baseEndpoint}/letter-templates/${templateName}/download`,
        {},
        {
          responseType: 'blob',
          observe: 'response'
        }
      )
      .pipe(map((response) => response.body as Blob));
  }

  public downloadReportLetters(reportId: number): Observable<Blob> {
    return this.apiService
      .get<HttpResponse<Blob>>(
        `${this.baseEndpoint}/reports/${reportId}/letters`,
        {},
        {
          responseType: 'blob',
          observe: 'response'
        }
      )
      .pipe(map((response) => response.body as Blob));
  }

  public downloadCsvReport(reportId: number): Observable<Blob> {
    return this.apiService
      .get<HttpResponse<Blob>>(
        `${this.baseEndpoint}/csv-reports/${reportId}/download`,
        {},
        {
          responseType: 'blob',
          observe: 'response'
        }
      )
      .pipe(map((response) => response.body as Blob));
  }
}
