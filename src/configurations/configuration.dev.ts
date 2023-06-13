import { initConfiguration } from './configuration.base';

export const configuration = initConfiguration({
  production: false,
  api: {
    domain: 'dev.api.jamesfrewportal.co.uk',
    get url(): string {
      return `https://${this.domain}`;
    }
  }
});
