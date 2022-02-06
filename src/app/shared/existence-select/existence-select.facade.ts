import { Injectable } from '@angular/core';
import { CustomSelectOption } from '@shared/custom-select';
import { TranslateService } from '@ngx-translate/core';
import { ComponentStore } from '@ngrx/component-store';
import { ExistenceSelectComponentState } from './existence-select.state';
import { Observable } from 'rxjs';

@Injectable()
export class ExistenceSelectComponentFacade {
  public get options$(): Observable<Array<CustomSelectOption<boolean>>> {
    return this.componentStore.select((state) =>
      [
        new CustomSelectOption({
          id: true,
          title: state.positiveTitle || this.translateService.instant('SHARED.EXISTENCE_SELECT.TEXT_YES')
        }),
        new CustomSelectOption({
          id: false,
          title: state.negativeTitle || this.translateService.instant('SHARED.EXISTENCE_SELECT.TEXT_NO')
        })
      ]
    );
  }

  constructor(
    private readonly componentStore: ComponentStore<ExistenceSelectComponentState>,
    private readonly translateService: TranslateService
  ) {
    this.resetState();
  }

  public resetState(): void {
    this.componentStore.setState(new ExistenceSelectComponentState());
  }

  public setPositiveTitle(value: string): void {
    this.updatePositiveTitle(value);
  }

  public setNegativeTitle(value: string): void {
    this.updateNegativeTitle(value);
  }

  private updatePositiveTitle(value: string): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        positiveTitle: value
      })
    )();
  }

  private updateNegativeTitle(value: string): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        negativeTitle: value
      })
    )();
  }
}
