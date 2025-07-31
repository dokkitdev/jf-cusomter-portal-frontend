import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { CollapsableComponentState } from './collapsable.state';

@Injectable()
export class CollapsableFacade {
  public get isCollapsed$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isCollapsed);
  }

  constructor(private readonly componentStore: ComponentStore<CollapsableComponentState>) {
    this.resetState();
  }

  public resetState(): void {
    this.componentStore.setState(new CollapsableComponentState());
  }

  public toggleIsCollapsed(): void {
    this.toggleStateIsCollapsed();
  }

  private toggleStateIsCollapsed(): void {
    this.componentStore.updater((state) => ({
      ...state,
      isCollapsed: !state.isCollapsed
    }))();
  }
}
