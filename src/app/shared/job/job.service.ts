import { ApiService } from '@ronas-it/angular-common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { classToPlain } from 'class-transformer';
import { ClassGroup } from '@shared/class-group';
import { JobRequest } from './models';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class JobService {
  public endpoint: string;

  constructor(
    private apiService: ApiService
  ) {
    this.endpoint = '/jobs';
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
