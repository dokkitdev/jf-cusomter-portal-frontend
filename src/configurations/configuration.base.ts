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
      madeSafeDate: 'dd-MM-yyyy',
      madeSafeTime: 'HH:mm',
      scheduleFilter: 'yyyy-MM-dd HH:mm:ss',
      assetDate: 'dd/MM/yyyy',
      documentDate: 'dd/MM/yyyy',
      filterDate: 'dd/MM/yyyy',
      lastLoginDate: 'dd/MM/yyyy HH:mm:ss',
      reports: {
        serviceControlDate: 'dd/MM/yyyy',
        serviceControlDateCSV: 'yyyy-MM-dd',
        kpiDate: 'yyyy_MM_dd'
      }
    },
    datepicker: {
      dateFormats: {
        display: {
          dateInput: 'dd/MM/yyyy',
          monthYearLabel: 'MMMM, yyyy'
        }
      }
    },
    timepickerTheme: {
      container: { buttonColor: '#35a9e1' },
      dial: { dialBackgroundColor: '#35a9e1' },
      clockFace: { clockHandColor: '#35a9e1' }
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
      default: ['.jpeg', '.jpg', '.png', '.bmp', '.pdf', '.doc', '.docx']
    },
    maxFileSize: {
      default: 15728640,
      jobAttachment: 10485760
    },
    fileSize: {
      base: 2,
      symbols: {
        KiB: 'KB',
        MiB: 'MB'
      }
    },
    countdownProgressbar: {
      radius: 12,
      strokeWidth: 1
    },
    masks: {
      phone: {
        mask: /^[\w\d()+ ]+$/
      }
    },
    collapsable: {
      height: 200
    },
    assetDetails: {
      countOfDisplayedCustomFields: 4
    },
    exportCSV: {
      jobs: 'jobs.csv',
      jobsReport: (date: string) => `JF_KPI_Report_${date}.csv`,
      sites: 'sites.csv',
      assets: 'assets.csv',
      assetsReport: (date: string) => `JF_Service_Control_${date}.csv`
    }
  }, configuration);
