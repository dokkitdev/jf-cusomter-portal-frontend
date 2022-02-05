import { ApiService } from '@ronas-it/angular-common';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { Media } from './models';
import { classToPlainFromExist, plainToClass } from 'class-transformer';
import { ClassGroup } from '@shared/class-group';

@Injectable()
export class MediaService {
  private endpoint: string;

  constructor(
    private apiService: ApiService
  ) {
    this.endpoint = '/media';
  }

  public getBlob(id: number): Observable<Blob> {
    return this.apiService
      .get<HttpResponse<Blob>>(`${this.endpoint}/${id}/download`, {}, {
        responseType: 'blob',
        observe: 'response'
      })
      .pipe(
        map((response) => (response.body as Blob))
      );
  }

  public get(id: number): Observable<Media> {
    return this.apiService
      .get<Media>(`${this.endpoint}/${id}`)
      .pipe(
        map((response) => plainToClass(Media, response, { groups: [ClassGroup.MAIN] }))
      );
  }

  public createWithProgress(media: Media): Observable<Media | number> {
    return this.apiService
      .post<HttpProgressEvent | HttpResponse<Media>>(
        this.endpoint,
        classToPlainFromExist(media, { file: media.file }, { groups: [ClassGroup.CREATING] }),
        { reportProgress: true, observe: 'events' }
      )
      .pipe(
        filter((response) => response.type === HttpEventType.UploadProgress || !!(<HttpResponse<Media>>response).body),
        map((response) => {
          if (response.type === HttpEventType.UploadProgress) {
            if (response.total) {
              return (response.loaded * 100) / response.total;
            } else {
              return 0;
            }
          }

          return plainToClass(Media, (<HttpResponse<Media>>response).body, { groups: [ClassGroup.MAIN] });
        })
      );
  }
}
