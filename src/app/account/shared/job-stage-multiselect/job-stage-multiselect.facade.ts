import { Injectable } from '@angular/core';
import { CustomSelectOption } from '@shared/custom-select/models';
import { TranslateService } from '@ngx-translate/core';
import { JobStage } from '@shared/job';

@Injectable()
export class AccountJobStageMultiselectComponentFacade {
  public get options(): Array<CustomSelectOption<string>> {
    return Object.values(JobStage)
      .map((stage) =>
        new CustomSelectOption<string>({
          id: stage,
          title: this.translateService.instant('SHARED.JOB_STAGE.TEXT_' + stage.toUpperCase())
        })
      );
  }

  constructor(
    private readonly translateService: TranslateService
  ) { }
}
