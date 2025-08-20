import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { switchMap, tap } from 'rxjs/operators';
import { Template, TemplateCategory, TemplateData } from './shared/models';
import { TemplateService } from './shared/services';
import { FileService } from '@shared/file';
import { NotificationService } from '@shared/notification';
import { TranslateService } from '@ngx-translate/core';

export interface AccountTemplatesPageState {
  isLoading: boolean;
  categories: TemplateCategory[];
  error?: string;
}

const initialState: AccountTemplatesPageState = {
  isLoading: false,
  categories: []
};

@Injectable()
export class AccountTemplatesPageFacade extends ComponentStore<AccountTemplatesPageState> {
  public readonly isLoading$ = this.select((state) => state.isLoading);
  public readonly categories$ = this.select((state) => state.categories);

  constructor(
    private templateService: TemplateService,
    private fileService: FileService,
    private notificationService: NotificationService,
    private translateService: TranslateService
  ) {
    super(initialState);
  }

  public loadTemplates(): void {
    this.setLoading(true);

    this.templateService
      .getTemplates()
      .pipe(
        tapResponse(
          (categories) => {
            this.setCategories(categories);
            this.setLoading(false);
          },
          (error) => {
            this.setLoading(false);
            this.notificationService.error(this.translateService.instant('ACCOUNT.TEMPLATES.NOTIFICATIONS.TEXT_LOADING_ERROR'));
            console.error('Failed to load templates:', error);
          }
        )
      )
      .subscribe();
  }

  public toggleCategory(categoryLabel: string): void {
    this.patchState((state) => ({
      categories: state.categories.map((category) =>
        category.group_label === categoryLabel ? { ...category, isExpanded: !category.isExpanded } : category
      )
    }));
  }

  public uploadTemplate(template: Template, file: File): void {
    this.uploadTemplateEffect({ template, file });
  }

  public downloadTemplate(template: Template): void {
    this.downloadTemplateEffect(template);
  }

  private readonly uploadTemplateEffect = this.effect((data$: Observable<{ template: Template; file: File }>) =>
    data$.pipe(
      switchMap(({ template, file }) =>
        this.templateService.uploadTemplate(template.name, file).pipe(
          tapResponse(
            () => {
              this.notificationService.success(
                this.translateService.instant('ACCOUNT.TEMPLATES.NOTIFICATIONS.TEXT_UPLOAD_SUCCESS', { name: template.label })
              );
            },
            (error) => {
              this.notificationService.error(
                this.translateService.instant('ACCOUNT.TEMPLATES.NOTIFICATIONS.TEXT_UPLOAD_ERROR', { name: template.label })
              );
              console.error('Upload failed:', error);
            }
          )
        )
      )
    )
  );

  private readonly downloadTemplateEffect = this.effect((template$: Observable<Template>) =>
    template$.pipe(
      switchMap((template) =>
        this.templateService.downloadTemplate(template.name).pipe(
          tapResponse(
            (blob) => {
              // Create filename from template label, defaulting to .docx extension
              const filename = `${template.label}.docx`;
              this.fileService.saveFile(blob, filename);
            },
            (error) => {
              this.notificationService.error(
                this.translateService.instant('ACCOUNT.TEMPLATES.NOTIFICATIONS.TEXT_DOWNLOAD_ERROR', { name: template.label })
              );
              console.error('Download failed:', error);
            }
          )
        )
      )
    )
  );

  private readonly setLoading = this.updater<boolean>((state, isLoading) => ({
    ...state,
    isLoading
  }));

  private readonly setCategories = this.updater<TemplateCategory[]>((state, categories) => ({
    ...state,
    categories
  }));

  public resetState(): void {
    this.setState(initialState);
  }
}
