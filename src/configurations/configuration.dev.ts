import { initConfiguration } from './configuration.base';

export const configuration = initConfiguration({
  production: false,
  api: {
    domain: 'dev.api.jf-customer-portal.ronasit.com',
    get url(): string {
      return `https://${this.domain}`;
    }
  }
});
