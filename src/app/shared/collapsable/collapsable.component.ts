import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { CollapsableFacade } from './collapsable.facade';

@Component({
  selector: 'collapsable',
  templateUrl: 'collapsable.html',
  styleUrls: ['collapsable.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CollapsableFacade, ComponentStore],
  standalone: false
})
export class CollapsableComponent {
  public isCollapsed$: Observable<boolean>;

  constructor(private facade: CollapsableFacade) {
    this.isCollapsed$ = this.facade.isCollapsed$;
  }

  public toggleCollapseClicked(): void {
    this.facade.toggleIsCollapsed();
  }
}
