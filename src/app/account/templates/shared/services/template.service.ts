import { ApiService } from '@ronas-it/angular-common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { LetterTemplateGroupResponse, TemplateCategory } from '../models';

@Injectable()
export class TemplateService {
  public endpoint: string;

  constructor(private apiService: ApiService) {
    this.endpoint = '/letter-templates';
  }

  public getTemplates(): Observable<Array<TemplateCategory>> {
    return this.apiService.get<Array<LetterTemplateGroupResponse>>(this.endpoint).pipe(
      map((response) =>
        response.map((group) => ({
          group_label: group.group_label,
          letter_templates: group.letter_templates,
          isExpanded: false
        }))
      )
    );
  }

  public uploadTemplate(templateName: string, file: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);

    return this.apiService.post<void>(`${this.endpoint}/${templateName}/upload`, formData);
  }

  public downloadTemplate(templateName: string): Observable<Blob> {
    return this.apiService
      .post<HttpResponse<Blob>>(
        `${this.endpoint}/${templateName}/download`,
        {},
        {
          responseType: 'blob',
          observe: 'response'
        }
      )
      .pipe(map((response) => response.body as Blob));
  }
}
