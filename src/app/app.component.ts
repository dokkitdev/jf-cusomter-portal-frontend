import { Component, ChangeDetectionStrategy } from '@angular/core';
import { configuration } from '@configurations';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(
    private translateService: TranslateService
  ) {
    this.translateService.addLangs(configuration.language.available);
    this.translateService.setDefaultLang(configuration.language.default);
    this.translateService.currentLang = configuration.language.default;
  }
}
