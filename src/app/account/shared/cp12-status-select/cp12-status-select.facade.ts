import { Injectable } from '@angular/core';
import { CustomSelectOption } from '@shared/custom-select/models';
import { TranslateService } from '@ngx-translate/core';
import { AssetCp12Status } from '@shared/asset';
import { snakeCase } from 'lodash';

@Injectable()
export class AccountCP12StatusSelectComponentFacade {
  public get options(): Array<CustomSelectOption<string>> {
    return Object.values(AssetCp12Status)
      .map((stage) => new CustomSelectOption<string>({
        id: stage,
        title: this.translateService.instant('SHARED.CP12_STATUS.TEXT_' + snakeCase(stage).toUpperCase())
      }));
  }

  constructor(
    private readonly translateService: TranslateService
  ) { }
}
