import { ApiService } from '@ronas-it/angular-common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationResponse } from '@shared/pagination';
import { classToPlain, plainToClass, plainToClassFromExist } from 'class-transformer';
import { ClassGroup } from '@shared/class-group';
import { Asset, AssetFilters, AssetName, AssetPaginationRequest, AssetServiceLevel } from './models';
import { AssetRelationType } from './types';
import { isUndefined, omitBy } from 'lodash';
import { AssetSortField } from './enums';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class AssetService {
  public endpoint: string;

  constructor(private apiService: ApiService) {
    this.endpoint = '/assets';
  }

  public search({
    page,
    perPage,
    orderBy,
    desc,
    relations,
    filters
  }: {
    page?: number;
    perPage?: number;
    orderBy?: AssetSortField;
    desc?: boolean;
    relations?: Array<AssetRelationType>;
    filters?: AssetFilters;
  } = {}): Observable<PaginationResponse<Asset>> {
    const request = new AssetPaginationRequest({
      ...filters,
      page,
      perPage,
      orderBy,
      desc,
      relations
    });

    return this.apiService
      .get<PaginationResponse<Asset>>(this.endpoint, omitBy(classToPlain<AssetPaginationRequest>(request), isUndefined))
      .pipe(
        map((response) =>
          plainToClassFromExist(new PaginationResponse<Asset>(Asset), response, { groups: [ClassGroup.MAIN] })
        )
      );
  }

  public get(id: number, relations?: Array<AssetRelationType>): Observable<Asset> {
    return this.apiService
      .get<Asset>(`${this.endpoint}/${id}`, omitBy({ with: relations }, isUndefined))
      .pipe(map((response) => plainToClass(Asset, response, { groups: [ClassGroup.MAIN] })));
  }

  public getServiceLevels(): Observable<Array<AssetServiceLevel>> {
    return this.apiService.get(`${this.endpoint}/service-levels`).pipe(
      map((response) =>
        plainToClass(AssetServiceLevel, response, {
          groups: [ClassGroup.MAIN]
        })
      )
    );
  }

  public downloadAttachment(id: number): Observable<Blob> {
    return this.apiService
      .get<HttpResponse<Blob>>(
        `/asset-attachments/${id}/download`,
        {},
        {
          responseType: 'blob',
          observe: 'response'
        }
      )
      .pipe(map((response) => response.body as Blob));
  }

  public exportCSV({
    orderBy,
    desc,
    relations,
    filters
  }: {
    orderBy?: AssetSortField;
    desc?: boolean;
    relations?: Array<AssetRelationType>;
    filters?: AssetFilters;
  } = {}): Observable<Blob> {
    const request = new AssetPaginationRequest({
      ...filters,
      orderBy,
      desc,
      relations,
      all: true
    });

    return this.apiService
      .get<HttpResponse<Blob>>(
        `${this.endpoint}/export`,
        omitBy(classToPlain<AssetPaginationRequest>(request), isUndefined),
        {
          responseType: 'blob',
          observe: 'response'
        }
      )
      .pipe(map((response) => response.body as Blob));
  }

  public exportReportCSV({
    orderBy,
    desc,
    relations,
    filters
  }: {
    orderBy?: AssetSortField;
    desc?: boolean;
    relations?: Array<AssetRelationType>;
    filters?: AssetFilters;
  } = {}): Observable<Blob> {
    const request = new AssetPaginationRequest({
      ...filters,
      orderBy,
      desc,
      relations,
      all: true
    });

    return this.apiService
      .get<HttpResponse<Blob>>(
        `${this.endpoint}/report/export`,
        omitBy(classToPlain<AssetPaginationRequest>(request), isUndefined),
        {
          responseType: 'blob',
          observe: 'response'
        }
      )
      .pipe(map((response) => response.body as Blob));
  }

  public getCustomAssetTypes(): Observable<Array<string>> {
    return this.apiService.get(`${this.endpoint}/types`);
  }

  public getAssetNames(): Observable<Array<AssetName>> {
    return this.apiService
      .get(`${this.endpoint}/names`)
      .pipe(map((response) => plainToClass(AssetName, response, { groups: [ClassGroup.MAIN] })));
  }
}
