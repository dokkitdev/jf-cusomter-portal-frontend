import { AppModule } from './app/app.module';
import { configuration } from '@configurations';
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

if (configuration.production) {
  enableProdMode();
}

platformBrowser()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
