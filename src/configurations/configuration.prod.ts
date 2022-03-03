import { initConfiguration } from './configuration.base';

export const configuration = initConfiguration({
  production: true,
  api: {
    domain: 'api.jamesfrewportal.co.uk/',
    get url(): string {
      return `https://${this.domain}`;
    }
  }
});
