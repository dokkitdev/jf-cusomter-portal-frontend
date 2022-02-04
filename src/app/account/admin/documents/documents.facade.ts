import { Injectable } from '@angular/core';
// import { AccountDialogAddDocumentComponent } from '@app/account/shared/dialog-add-document';
// import { AccountDialogAddDocumentActions } from '@app/account/shared/dialog-add-document/store';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DialogService } from '@shared/dialog';
import { Document, DocumentRelationType, DocumentService, DocumentSortField } from '@shared/document';
import { NavigationActions, NavigationSelectors } from '@shared/navigation';
import { PaginationResponse } from '@shared/pagination';
import { AppState } from '@shared/store';
import { filter } from 'lodash';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AccountAdminDocumentsPageState } from './documents.state';
import { AccountAdminDocumentsQueryParameters } from './shared/models';

@Injectable()
export class AccountAdminDocumentsPageFacade {
  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get isLoadingToPage$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoadingToPage);
  }

  public get hasMoreItems$(): Observable<boolean> {
    return this.componentStore.select((state) => state.totalItems > state.items.length);
  }

  public get items$(): Observable<Array<Document>> {
    return this.componentStore.select((state) => state.items);
  }

  public get parameters$(): Observable<AccountAdminDocumentsQueryParameters> {
    return this.componentStore.select((state) => ({
      page: state.page,
      perPage: state.perPage,
      orderBy: state.orderBy,
      desc: state.desc
    }));
  }

  public get relations$(): Observable<Array<DocumentRelationType>> {
    return this.componentStore.select((state) => state.relations);
  }

  private loadItemsEffect$: () => Observable<void>;
  private loadItemsByParametersEffect$: (page?: number) => Observable<void>;
  private loadNextPageEffect$: () => Observable<void>;
  private loadItemsToPageEffect$: () => Observable<void>;
  private openAddDocumentDialogEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountAdminDocumentsPageState>,
    private readonly store: Store<AppState>,
    private readonly actions$: Actions,
    private readonly documentService: DocumentService,
    private readonly dialogService: DialogService
  ) {
    this.resetState();

    this.registerLoadItemsEffect();
    this.registerLoadItemsByParametersEffect();
    this.registerLoadNextPageEffect();
    this.registerLoadItemsToPageEffect();
    this.registerOpenAddDocumentDialogEffect();
    this.registerAddCreatedItemEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountAdminDocumentsPageState());
  }

  public loadItems(): void {
    this.loadItemsEffect$();
  }

  public loadItemsByParameters(page?: number): void {
    this.loadItemsByParametersEffect$(page);
  }

  public loadItemsToPage(): void {
    this.loadItemsToPageEffect$();
  }

  public loadNextPage(): void {
    this.loadNextPageEffect$();
  }

  public changeSort(parameters: AccountAdminDocumentsQueryParameters): void {
    this.updateStateSort(parameters);
    this.loadItemsByParameters();
  }

  public deleteItem(id: number): void {
    this.deleteItemFromList(id);
  }

  public openAddDocumentDialog(): void {
    this.openAddDocumentDialogEffect$();
  }

  private updateIsLoading(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isLoading: value
      })
    )();
  }

  private updateIsLoadingToPage(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isLoadingToPage: value
      })
    )();
  }

  private updateItems(response: PaginationResponse<Document>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items: [...state.items, ...response.items],
        totalItems: response.totalItems
      })
    )();
  }

  private addItemToList(document: Document): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items: [document, ...state.items],
        totalItems: state.totalItems + 1
      })
    )();
  }

  private deleteItemFromList(id: number): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items: filter(state.items, (item) => item.id !== id),
        totalItems: state.totalItems - 1
      })
    )();
  }

  private updateNextPage(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        page: state.page + 1
      })
    )();
  }

  private updateStateSort(parameters: AccountAdminDocumentsQueryParameters): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        orderBy: parameters.orderBy,
        desc: parameters.desc,
        page: 1,
        items: [],
        totalItems: 0
      })
    )();
  }

  private updateQueryParameters(parameters: AccountAdminDocumentsQueryParameters): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        orderBy: parameters.orderBy || state.orderBy,
        desc: parameters.desc || state.desc,
        page: parameters.page || state.page
      })
    )();
  }

  private registerOpenAddDocumentDialogEffect(): void {
    // this.openAddDocumentDialogEffect$ = this.componentStore.effect((origin$) =>
    //   origin$.pipe(
    //     map(() => this.dialogService.open(AccountDialogAddDocumentComponent, {
    //       autoFocus: false
    //     }))
    //   )
    // );
  }

  private registerLoadItemsEffect(): void {
    this.loadItemsEffect$ = this.componentStore.effect((origin$: Observable<void>) =>
      origin$.pipe(
        withLatestFrom(
          this.store.select(NavigationSelectors.selectQueryParams)
        ),
        tap(([_, queryParams]) => {
          this.updateIsLoading(true);

          const parameters = new AccountAdminDocumentsQueryParameters({
            page: (queryParams.page) ? parseInt(queryParams.page, 10) : undefined,
            orderBy: queryParams.orderBy || undefined,
            desc: queryParams.desc === 'true'
          });

          this.updateQueryParameters(parameters);

          return (parameters.page > 1)
            ? this.loadItemsToPage()
            : this.loadItemsByParameters();
        })
      )
    );
  }

  private registerLoadItemsByParametersEffect(): void {
    this.loadItemsByParametersEffect$ = this.componentStore.effect((origin$: Observable<number>) =>
      origin$.pipe(
        withLatestFrom(
          this.parameters$,
          this.isLoadingToPage$,
          this.relations$
        ),
        switchMap(([targetPage, parameters, isLoadingToPage, relations]) => {
          const page = targetPage || parameters.page;
          const perPage = parameters.perPage;
          const orderBy = parameters.orderBy;
          const desc = parameters.desc;

          if (!isLoadingToPage) {
            this.store.dispatch(NavigationActions.mergeQueryParams({
              queryParams: { page, orderBy, desc }
            }));
          }

          this.updateIsLoading(true);

          return this.tryLoadItemsByParameters(page, perPage, orderBy, desc, relations);
        })
      )
    );
  }

  private tryLoadItemsByParameters(
    page: number, perPage: number, orderBy: DocumentSortField, desc: boolean, relations: Array<DocumentRelationType>
  ): Observable<any> {
    return this.documentService
      .search({
        page,
        perPage,
        orderBy,
        desc,
        relations
      })
      .pipe(
        withLatestFrom(
          this.isLoadingToPage$,
          this.parameters$
        ),
        tapResponse(
          ([response, isLoadingToPage, parameters]) => {
            this.updateIsLoading(false);
            this.updateItems(response);

            if (!isLoadingToPage) {
              return;
            }

            if (response.currentPage >= parameters.page) {
              this.updateIsLoadingToPage(false);

              return;
            }

            if (response.currentPage !== response.lastPage) {
              this.loadItemsByParameters(response.currentPage + 1);

              return;
            }

            this.updateIsLoadingToPage(false);
            this.updateQueryParameters(new AccountAdminDocumentsQueryParameters({ page: response.currentPage }));
            this.store.dispatch(NavigationActions.mergeQueryParams({
              queryParams: { page: response.currentPage }
            }));
          },
          () => this.updateIsLoading(false)
        )
      );
  }

  private registerLoadNextPageEffect(): void {
    this.loadNextPageEffect$ = this.componentStore.effect((origin$: Observable<void>) =>
      origin$.pipe(
        tap(() => {
          this.updateNextPage();

          this.loadItemsByParameters();
        })
      )
    );
  }

  private registerLoadItemsToPageEffect(): void {
    this.loadItemsToPageEffect$ = this.componentStore.effect((origin$: Observable<void>) =>
      origin$.pipe(
        tap(() => {
          this.updateIsLoadingToPage(true);

          this.loadItemsByParameters(1);
        })
      )
    );
  }

  private registerAddCreatedItemEffect(): void {
    // this.componentStore.effect(() =>
    //   this.actions$.pipe(
    //     ofType(AccountDialogAddDocumentActions.createDocumentSuccess),
    //     withLatestFrom(
    //       this.relations$
    //     ),
    //     mergeMap(([{ documentID }, relations]) => this.documentService
    //       .get(documentID, relations)
    //       .pipe(
    //         tap((document) => this.addItemToList(document))
    //       )
    //     )
    //   )
    // );
  }
}
