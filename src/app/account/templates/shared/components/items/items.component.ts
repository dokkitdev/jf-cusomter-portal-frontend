import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountTemplatesPageFacade } from '@app/account/templates/templates.facade';
import { Observable } from 'rxjs';
import { Template } from '../../models';
import { LetterTemplateGroup } from '@shared/notify';
import { heightCollapseAnimation } from '@shared/animations';

@Component({
  selector: 'templates-items',
  templateUrl: 'items.html',
  styleUrls: ['items.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightCollapseAnimation],
  standalone: false
})
export class AccountTemplatesItemsComponent {
  public isLoading$: Observable<boolean>;
  public categories$: Observable<Array<LetterTemplateGroup & { isExpanded: boolean }>>;

  constructor(private facade: AccountTemplatesPageFacade) {
    this.isLoading$ = this.facade.isLoading$;
    this.categories$ = this.facade.categories$;
  }

  public toggleCategory(categoryId: string): void {
    this.facade.toggleCategory(categoryId);
  }

  public onUploadClicked(template: Template): void {
    this.facade.selectAndUploadTemplate(template);
  }

  public onDownloadClicked(template: Template): void {
    this.facade.downloadTemplate(template);
  }

  public trackByCategory(index: number, category: LetterTemplateGroup & { isExpanded: boolean }): string {
    return category.groupLabel;
  }

  public trackByTemplate(index: number, template: Template): string {
    return template.name;
  }
}
