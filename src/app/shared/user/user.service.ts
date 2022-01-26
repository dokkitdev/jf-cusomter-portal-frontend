import { ClassGroup } from '@shared/class-group';
import { classToPlain, plainToClass, plainToClassFromExist } from 'class-transformer';
import { omitBy, isUndefined } from 'lodash';
import { UserPaginationRequest } from './models/pagination-request';
import { PaginationResponse } from '@shared/pagination';
import { UserFilters } from './models/filters';
import { UserRelationType } from './types/relation';
import { UserSortField } from '@shared/user';
import { UserService as CommonUserService } from '@ronas-it/angular-common';
import { Injectable, Injector } from '@angular/core';
import { User } from './models';
import { Observable, of } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { UserRole } from './enums';

@Injectable()
export class UserService extends CommonUserService<User> {
  public endpoint: string;

  public get profile$(): Observable<User> {
    return super.profile$.pipe(
      exhaustMap((profile) => {
        if (profile) {
          return of(profile);
        }

        return this.refreshProfile();
      })
    );
  }

  public get isAdmin$(): Observable<boolean> {
    return this
      .profile$
      .pipe(
        map((profile) => profile.roleID === UserRole.ADMIN)
      );
  }

  constructor(
    protected injector: Injector
  ) {
    super(injector);

    this.endpoint = '/users';
  }

  public search({ page, perPage, orderBy, desc, relations, filters }: {
    page?: number,
    perPage?: number,
    orderBy?: UserSortField,
    desc?: boolean,
    relations?: Array<UserRelationType>,
    filters?: UserFilters
  } = {}): Observable<PaginationResponse<User>> {
    const request = new UserPaginationRequest({ ...filters, page, perPage, orderBy, desc, relations });

    return this.apiService
      .get<PaginationResponse<User>>(this.endpoint, omitBy(classToPlain<UserPaginationRequest>(request), isUndefined))
      .pipe(
        map((response) => plainToClassFromExist(
          new PaginationResponse<User>(User), response, { groups: [ClassGroup.MAIN] })
        )
      );
  }

  public get(id: number, relations?: Array<UserRelationType>): Observable<User> {
    return this.apiService
      .get<User>(`${this.endpoint}/${id}`, omitBy({ with: relations }, isUndefined))
      .pipe(
        map((response) => plainToClass(User, response, { groups: [ClassGroup.MAIN] }))
      );
  }

  public create(user: User): Observable<User> {
    return this.apiService
      .post<User>(this.endpoint, classToPlain(user, { groups: [ClassGroup.CREATING] }))
      .pipe(
        map((response) => plainToClass(User, response, { groups: [ClassGroup.MAIN] }))
      );
  }

  public update(user: User): Observable<void> {
    return this.apiService.put(`${this.endpoint}/${user.id}`, classToPlain(user, { groups: [ClassGroup.UPDATING] }));
  }

  public delete(id: number): Observable<void> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }

  public resendInvitation(id: number): Observable<void> {
    return this.apiService.post(`${this.endpoint}/${id}/resend-invitation`);
  }
}
