import { ApiService } from '@ronas-it/angular-common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { ClassGroup } from '@shared/class-group';
import { DashboardStatistic } from './models';

@Injectable()
export class DashboardService {
  public endpoint: string;

  constructor(
    private apiService: ApiService
  ) {
    this.endpoint = '/dashboard';
  }

  public getStatistic(): Observable<DashboardStatistic> {
    return this.apiService
      .get<DashboardStatistic>(`${this.endpoint}`)
      .pipe(
        map((response) => plainToClass(DashboardStatistic, response, { groups: [ClassGroup.MAIN] }))
      );
  }
}
