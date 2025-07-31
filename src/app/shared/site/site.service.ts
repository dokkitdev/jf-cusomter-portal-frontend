import { ApiService } from '@ronas-it/angular-common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationResponse } from '@shared/pagination';
import { classToPlain, plainToClass, plainToClassFromExist } from 'class-transformer';
import { ClassGroup } from '@shared/class-group';
import { Site, SiteFilters, SitePaginationRequest } from './models';
import { SiteCountRelationType, SiteRelationType } from './types';
import { isUndefined, omitBy } from 'lodash';
import { SiteSortField } from './enums';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class SiteService {
  public endpoint: string;

  constructor(private apiService: ApiService) {
    this.endpoint = '/sites';
  }

  public search({
    page,
    perPage,
    orderBy,
    desc,
    relations,
    countRelations,
    filters
  }: {
    page?: number;
    perPage?: number;
    orderBy?: SiteSortField;
    desc?: boolean;
    relations?: Array<SiteRelationType>;
    countRelations?: Array<SiteCountRelationType>;
    filters?: SiteFilters;
  } = {}): Observable<PaginationResponse<Site>> {
    const request = new SitePaginationRequest({
      ...filters,
      page,
      perPage,
      orderBy,
      desc,
      relations,
      countRelations
    });

    return this.apiService
      .get<PaginationResponse<Site>>(this.endpoint, omitBy(classToPlain<SitePaginationRequest>(request), isUndefined))
      .pipe(
        map((response) =>
          plainToClassFromExist(new PaginationResponse<Site>(Site), response, {
            groups: [ClassGroup.MAIN]
          })
        )
      );
  }

  public get(id: number, relations?: Array<SiteRelationType>): Observable<Site> {
    return this.apiService
      .get<Site>(`${this.endpoint}/${id}`, omitBy({ with: relations }, isUndefined))
      .pipe(map((response) => plainToClass(Site, response, { groups: [ClassGroup.MAIN] })));
  }

  public update(site: Site): Observable<void> {
    return this.apiService.put(
      `${this.endpoint}/${site.id}`,
      classToPlain(site, {
        groups: [ClassGroup.UPDATING],
        excludeExtraneousValues: true
      })
    );
  }

  public exportCSV({
    orderBy,
    desc,
    relations,
    countRelations,
    filters
  }: {
    orderBy?: SiteSortField;
    desc?: boolean;
    relations?: Array<SiteRelationType>;
    countRelations?: Array<SiteCountRelationType>;
    filters?: SiteFilters;
  } = {}): Observable<Blob> {
    const request = new SitePaginationRequest({
      ...filters,
      orderBy,
      desc,
      relations,
      countRelations,
      all: true
    });

    return this.apiService
      .get<HttpResponse<Blob>>(
        `${this.endpoint}/export`,
        omitBy(classToPlain<SitePaginationRequest>(request), isUndefined),
        {
          responseType: 'blob',
          observe: 'response'
        }
      )
      .pipe(map((response) => response.body as Blob));
  }
}
