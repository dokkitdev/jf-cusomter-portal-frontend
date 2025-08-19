import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { switchMap, tap } from 'rxjs/operators';
import { Template, TemplateCategory, TemplateData } from './shared/models';
import { Media, MediaService } from '@shared/media';
import { FileService } from '@shared/file';

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
    private mediaService: MediaService,
    private fileService: FileService
  ) {
    super(initialState);
  }

  public loadTemplates(): void {
    this.setLoading(true);

    // Mock data based on Figma design
    const mockData: TemplateData = {
      categories: [
        {
          id: 'private',
          name: 'Private',
          isExpanded: false,
          templates: [
            { id: 'letter-no-access-1', name: 'Letter No Access 1 (Letter)', categoryId: 'private' },
            { id: 'letter-no-access-2', name: 'Letter No Access 2 (Letter)', categoryId: 'private' },
            { id: 'letter-no-access-3', name: 'Letter No Access 3 (Letter)', categoryId: 'private' }
          ]
        },
        {
          id: 'housing-authorities',
          name: 'Housing Authorities',
          isExpanded: false,
          templates: []
        },
        {
          id: 'chl-other-letters',
          name: 'CHL Other Letters',
          isExpanded: false,
          templates: []
        },
        {
          id: 'chl-gas-letters',
          name: 'CHL Gas Letters',
          isExpanded: false,
          templates: []
        },
        {
          id: 'chl-electric-letters',
          name: 'CHL Electric Letters',
          isExpanded: false,
          templates: []
        },
        {
          id: 'appointment-letter',
          name: 'Appointment letter',
          isExpanded: false,
          templates: []
        }
      ]
    };

    setTimeout(() => {
      this.setCategories(mockData.categories);
      this.setLoading(false);
    }, 500);
  }

  public toggleCategory(categoryId: string): void {
    this.patchState((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryId ? { ...category, isExpanded: !category.isExpanded } : category
      )
    }));
  }

  public uploadTemplate(template: Template, file: File): void {
    // Implementation would upload file and update template
    console.log('Upload template:', template, file);
  }

  public downloadTemplate(template: Template): void {
    if (template.mediaId) {
      this.downloadTemplateEffect(template.mediaId);
    }
  }

  private readonly downloadTemplateEffect = this.effect((mediaId$: Observable<number>) =>
    mediaId$.pipe(
      switchMap((mediaId) =>
        this.mediaService.getBlob(mediaId).pipe(
          tapResponse(
            (response) => {
              // Extract filename from template or use default
              this.fileService.saveFile(response, 'template.pdf');
            },
            (error) => console.error('Download failed:', error)
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
