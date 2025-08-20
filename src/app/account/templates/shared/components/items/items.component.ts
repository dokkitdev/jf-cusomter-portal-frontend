import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountTemplatesPageFacade } from '@app/account/templates/templates.facade';
import { Observable } from 'rxjs';
import { TemplateCategory, Template } from '../../models';
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
  public categories$: Observable<TemplateCategory[]>;

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

  public trackByCategory(index: number, category: TemplateCategory): string {
    return category.group_label;
  }

  public trackByTemplate(index: number, template: Template): string {
    return template.name;
  }
}
