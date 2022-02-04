import { ApiService } from '@ronas-it/angular-common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationResponse } from '@shared/pagination';
import { classToPlain, plainToClass, plainToClassFromExist } from 'class-transformer';
import { ClassGroup } from '@shared/class-group';
import { Document, DocumentPaginationRequest, DocumentFilters } from './models';
import { DocumentRelationType } from './types';
import { DocumentSortField } from './enums';
import { isUndefined, omitBy } from 'lodash';

@Injectable()
export class DocumentService {
  public endpoint: string;

  constructor(
    private apiService: ApiService
  ) {
    this.endpoint = '/documents';
  }

  public search({ page, perPage, orderBy, desc, relations, filters }: {
    page?: number,
    perPage?: number,
    orderBy?: DocumentSortField,
    desc?: boolean,
    relations?: Array<DocumentRelationType>,
    filters?: DocumentFilters
  } = {}): Observable<PaginationResponse<Document>> {
    const request = new DocumentPaginationRequest({ ...filters, page, perPage, orderBy, desc, relations });

    return this.apiService
      .get<PaginationResponse<Document>>(this.endpoint, omitBy(classToPlain<DocumentPaginationRequest>(request), isUndefined))
      .pipe(
        map((response) => plainToClassFromExist(
          new PaginationResponse<Document>(Document), response, { groups: [ClassGroup.MAIN] })
        )
      );
  }

  public get(id: number, relations?: Array<DocumentRelationType>): Observable<Document> {
    return this.apiService
      .get<Document>(`${this.endpoint}/${id}`, omitBy({ with: relations }, isUndefined))
      .pipe(
        map((response) => plainToClass(Document, response, { groups: [ClassGroup.MAIN] }))
      );
  }

  public create(document: Document): Observable<Document> {
    return this.apiService
      .post<Document>(this.endpoint, classToPlain(document, { groups: [ClassGroup.CREATING] }))
      .pipe(
        map((response) => plainToClass(Document, response, { groups: [ClassGroup.MAIN] }))
      );
  }

  public delete(id: number): Observable<void> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }
}
