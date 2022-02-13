import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Job, JobAttachment, JobRelationType, JobService } from '@shared/job';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AccountJobsViewPageState } from './view.state';
import { exhaustMap, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store';
import { NavigationSelectors, NavigationService } from '@shared/navigation';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { FileService } from '@shared/file';
import { UserService } from '@shared/user';
import { concatLatestFrom } from '@ngrx/effects';

@Injectable()
export class AccountJobsViewPageFacade {
  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get job$(): Observable<Job> {
    return this.componentStore.select((state) => state.job);
  }

  public get relations$(): Observable<Array<JobRelationType>> {
    return this.componentStore.select((state) => state.relations);
  }

  private initPageEffect$: () => Observable<void>;
  private downloadAttachmentEffect$: (attachment: JobAttachment) => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountJobsViewPageState>,
    private readonly store: Store<AppState>,
    private readonly router: Router,
    private readonly jobService: JobService,
    private readonly fileService: FileService,
    private readonly navigationService: NavigationService,
    private readonly userService: UserService
  ) {
    this.resetState();

    this.registerInitPageEffect();
    this.registerDownloadAttachmentEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountJobsViewPageState());
  }

  public initPage(): void {
    this.initPageEffect$();
  }

  public downloadAttachment(attachment: JobAttachment): void {
    this.downloadAttachmentEffect$(attachment);
  }

  public back(): void {
    this.navigationService.back('/account/jobs');
  }

  public redirectToJobsPage(): void {
    this.router.navigate(['/account/jobs']);
  }

  private updateIsLoading(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isLoading: value
      })
    )();
  }

  private updateJob(job: Job): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        job
      })
    )();
  }

  private registerInitPageEffect(): void {
    this.initPageEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        concatLatestFrom(() => [
          this.store.select(NavigationSelectors.selectRouteParam('id')),
          this.relations$
        ]),
        switchMap(([_, id, relations]) => {
          this.updateIsLoading(true);

          if (!!id && !!parseInt(id, 10)) {
            return this.tryToLoadData(parseInt(id, 10), relations);
          }

          this.redirectToJobsPage();

          return EMPTY;
        })
      )
    );
  }

  private tryToLoadData(id: number, relations: Array<JobRelationType>): Observable<Job> {
    return this.jobService
      .get(id, relations)
      .pipe(
        tapResponse(
          (response) => {
            this.updateJob(response);
            this.updateIsLoading(false);
          },
          (response: HttpErrorResponse) => {
            this.updateIsLoading(false);

            if (response.status === HttpStatusCode.NotFound) {
              this.redirectToJobsPage();
            }
          }
        )
      );
  }

  private registerDownloadAttachmentEffect(): void {
    this.downloadAttachmentEffect$ = this.componentStore.effect((origin$: Observable<JobAttachment>) =>
      origin$.pipe(
        exhaustMap((attachment) =>
          this.jobService
            .downloadAttachment(attachment.id)
            .pipe(
              tap((response) => this.fileService.saveFile(response, attachment.name))
            )
        )
      )
    );
  }
}
