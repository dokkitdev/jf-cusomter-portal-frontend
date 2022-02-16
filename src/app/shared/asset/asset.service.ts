import { ClassGroup } from '@shared/class-group/enums/class-group';
import { classToPlain, plainToClassFromExist } from 'class-transformer';
import omitBy from 'lodash/omitBy';
import isUndefined from 'lodash/isUndefined';
import { PaginationResponse } from '@shared/pagination/models/response';
import { map, Observable } from 'rxjs';
import { Asset, AssetFilters, AssetPaginationRequest } from './models';
import { AssetSortField } from './enums';
import { AssetRelationType } from './types';
import { ApiService } from '@ronas-it/angular-common';
import { Injectable } from '@angular/core';

@Injectable()
export class AssetService {
  public endpoint: string;

  constructor(
    private apiService: ApiService
  ) {
    this.endpoint = '/assets';
  }

  public search({ page, perPage, orderBy, desc, relations, filters }: {
    page?: number,
    perPage?: number,
    orderBy?: AssetSortField,
    desc?: boolean,
    relations?: Array<AssetRelationType>,
    filters?: AssetFilters
  } = {}): Observable<PaginationResponse<Asset>> {
    const request = new AssetPaginationRequest({ ...filters, page, perPage, orderBy, desc, relations });

    return this.apiService
      .get<PaginationResponse<Asset>>(this.endpoint, omitBy(classToPlain<AssetPaginationRequest>(request), isUndefined))
      .pipe(
        map((response) => plainToClassFromExist(
          new PaginationResponse<Asset>(Asset), response, { groups: [ClassGroup.MAIN] })
        )
      );
  }
}
