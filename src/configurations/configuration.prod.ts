import { initConfiguration } from './configuration.base';

export const configuration = initConfiguration({
  production: true,
  api: {
    domain: 'api.jfcusomter.app',
    get url(): string {
      return `https://${this.domain}`;
    }
  }
});
