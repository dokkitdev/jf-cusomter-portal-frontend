import { initConfiguration } from './configuration.base';

export const configuration = initConfiguration({
  production: false,
  api: {
    domain: 'localhost',
    get url(): string {
      return `http://${this.domain}`;
    }
  }
});
