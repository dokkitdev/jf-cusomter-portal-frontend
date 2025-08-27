import { ApiService } from '@ronas-it/angular-common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { classToPlain, plainToClass } from 'class-transformer';
import { ClassGroup } from '@shared/class-group';
import { WarehouseReportRequest, LetterTemplateGroup } from './models';

@Injectable()
export class NotifyService {
  private baseEndpoint: string;

  constructor(private apiService: ApiService) {
    this.baseEndpoint = '/notify';
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
}
