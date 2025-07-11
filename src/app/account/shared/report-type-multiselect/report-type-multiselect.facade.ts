import { Injectable } from '@angular/core';
import { CustomSelectOption } from '@shared/custom-select/models';
import { TranslateService } from '@ngx-translate/core';
import { ReportType } from '@shared/report';

@Injectable()
export class AccountReportTypeMultiselectComponentFacade {
  public get options(): Array<CustomSelectOption<string>> {
    return Object.values(ReportType)
      .map((type) =>
        new CustomSelectOption<string>({
          id: type,
          title: this.translateService.instant('SHARED.REPORT_TYPE.TEXT_' + type.toUpperCase())
        })
      );
  }

  constructor(
    private readonly translateService: TranslateService
  ) { }
}
