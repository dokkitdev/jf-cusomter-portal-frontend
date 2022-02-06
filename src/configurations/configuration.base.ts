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
    },
    dateFormats: {
      jobDate: 'MMM dd, yyyy',
      jobTime: 'H:mm',
      scheduleFilter: 'yyyy-MM-dd HH:mm:ss',
      invoiceDate: 'dd/MM/yyyy',
      quoteDate: 'dd/MM/yyyy',
      quoteIssuedDate: 'MMM dd, yyyy',
      assetDate: 'dd/MM/yyyy',
      documentDate: 'dd/MM/yyyy',
      filterDate: 'dd/MM/yyyy',
      lastLoginDate: 'dd/MM/yyyy HH:mm:ss'
    },
    dialog: {
      panelClass: 'dialog-panel',
      disableClose: true
    },
    notifications: {
      positionClass: 'inline',
      disableTimeOut: true,
      tapToDismiss: false
    },
    allowedFileExtensions: {
      default: ['image/jpeg', 'image/png', 'image/bmp', 'image/heic', 'image/heif', 'application/pdf']
    },
    maxFileSize: {
      default: 10485760
    },
    countdownProgressbar: {
      radius: 12,
      strokeWidth: 1
    },
    masks: {
      phone: {
        mask: /^[\w\d()+ ]+$/
      }
    }
  }, configuration);
