import { ParsingLog, SystemLog } from '@shared/notify';
import { AdminLogsTab } from './shared/types';
import { NotifyParsingLogsSortField, NotifySystemLogsSortField } from '@shared/notify/type';

export class AccountAdminDocumentsPageState {
  public systemLogs: Array<SystemLog>;
  public parsingLogs: Array<ParsingLog>;
  public isLoadingSystem: boolean;
  public isLoadingParsing: boolean;
  public currentSystemPage: number;
  public currentParsingPage: number;
  public systemPerPage: number;
  public parsingPerPage: number;
  public systemTotalPages: number;
  public parsingTotalPages: number;
  public systemTotalItems: number;
  public parsingTotalItems: number;
  public activeTab: AdminLogsTab;
  public orderBy: NotifySystemLogsSortField | NotifyParsingLogsSortField;
  public desc: boolean;
  public readonly systemPaginationId: string;
  public readonly parsingPaginationId: string;

  constructor() {
    this.systemLogs = [];
    this.parsingLogs = [];
    this.isLoadingSystem = false;
    this.isLoadingParsing = false;
    this.currentSystemPage = 1;
    this.currentParsingPage = 1;
    this.systemTotalPages = 1;
    this.parsingTotalPages = 1;
    this.systemTotalItems = 0;
    this.parsingTotalItems = 0;
    this.systemPerPage = 15;
    this.parsingPerPage = 15;
    this.activeTab = 'system';
    this.orderBy = NotifySystemLogsSortField.CREATED_AT;
    this.desc = true;
    this.systemPaginationId = 'system-logs-pagination';
    this.parsingPaginationId = 'parsing-logs-pagination';
  }
}
