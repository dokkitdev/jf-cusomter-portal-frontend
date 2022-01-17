import { merge } from 'lodash';

export const initConfiguration = (configuration: any): any =>
  merge({
    production: false,
    api: {
      allowedDomains: [
        configuration.api.domain
      ],
      disallowedRoutes: [
        '/password-reset'
      ].map((endpoint) => `${configuration.api.url}/${endpoint}`)
    },
    storeDevtools: {
      maxAge: 30,
      logOnly: false
    },
    language: {
      available: ['en'],
      default: 'en'
    }
  }, configuration);
