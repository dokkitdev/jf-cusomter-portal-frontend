import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomSelectOption } from '@shared/custom-select/models';
import { AssetTestResult } from '@shared/asset';

@Injectable()
export class AccountAssetTestResultSelectComponentFacade {
  public get options(): Array<CustomSelectOption<string>> {
    return Object.keys(AssetTestResult)
      .map((result) => result as keyof typeof AssetTestResult)
      .map(
        (result) =>
          new CustomSelectOption<string>({
            id: AssetTestResult[result],
            title: this.translateService.instant('SHARED.ASSET_TEST_RESULT.TEXT_' + result)
          })
      );
  }

  constructor(private readonly translateService: TranslateService) {}
}
