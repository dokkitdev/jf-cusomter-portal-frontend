import { RefreshTokenMode } from '@ronas-it/angular-common';
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
      ].map((endpoint) => `${configuration.api.url}/${endpoint}`),
      unauthenticatedRoute: '/login',
      authenticatedRoute: '/account',
      refreshTokenEndpointMethod: 'get',
      refreshTokenMode: RefreshTokenMode.HEADER
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
