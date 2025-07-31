import { AssetCp12Status } from '@shared/asset';
import { ClassGroup } from '@shared/class-group';
import { Customer } from '@shared/customer';
import { Site } from '@shared/site';
import { Expose, Transform, Type } from 'class-transformer';
import { DateTime } from 'luxon';
import { AssetAttachment } from './attachment';
import { AssetCustomField } from './custom-field';
import { AssetTestResult } from '../enums';
import { AssetTest } from './test';
import { Job, JobSchedule, NoAccessDate } from '@shared/job';

export class Asset {
  @Expose({ groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ groups: [ClassGroup.MAIN] })
  public name: string;

  @Expose({ groups: [ClassGroup.MAIN] })
  public location: string;

  @Expose({ name: 'simpro_asset_id', groups: [ClassGroup.MAIN] })
  public assetID: number;

  @Expose({ name: 'site_id', groups: [ClassGroup.MAIN] })
  public siteID: number;

  @Expose({ name: 'job_id', groups: [ClassGroup.MAIN] })
  public jobID: number;

  @Expose({ groups: [ClassGroup.MAIN] })
  public make: string;

  @Expose({ groups: [ClassGroup.MAIN] })
  public model: string;

  @Transform(({ value }) => (value ? DateTime.fromSQL(value) : value), {
    toClassOnly: true
  })
  @Expose({ name: 'last_cp12_date', groups: [ClassGroup.MAIN] })
  public lastCp12Date: DateTime;

  @Expose({ name: 'asset_type', groups: [ClassGroup.MAIN] })
  public type: string;

  @Expose({ name: 'custom_asset_type_value', groups: [ClassGroup.MAIN] })
  public customAssetTypeValue: string;

  @Expose({ name: 'last_test_result', groups: [ClassGroup.MAIN] })
  public lastTestResult: AssetTestResult;

  @Expose({ name: 'service_level_name', groups: [ClassGroup.MAIN] })
  public serviceLevelName: string;

  @Expose({ name: 'archived', groups: [ClassGroup.MAIN] })
  public isArchived: boolean;

  @Transform(({ value }) => (value ? DateTime.fromISO(value) : value), {
    toClassOnly: true
  })
  @Expose({ name: 'last_test_date', groups: [ClassGroup.MAIN] })
  public lastTestDate: DateTime;

  @Transform(({ value }) => (value ? DateTime.fromISO(value) : value), {
    toClassOnly: true
  })
  @Expose({ name: 'next_service_date', groups: [ClassGroup.MAIN] })
  public nextServiceDate: DateTime;

  @Transform(({ value }) => (value ? DateTime.fromISO(value) : value), {
    toClassOnly: true
  })
  @Expose({ name: 'expiry_date', groups: [ClassGroup.MAIN] })
  public expiryDate: DateTime;

  @Transform(({ value }) => (value ? DateTime.fromSQL(value) : value), {
    toClassOnly: true
  })
  @Expose({ name: 'sortable_date', groups: [ClassGroup.MAIN] })
  public sortableDate: DateTime;

  @Expose({ name: 'cp12_status' })
  public CP12Status: AssetCp12Status;

  @Type(() => Customer)
  @Expose({ name: 'simpro_customer', groups: [ClassGroup.MAIN] })
  public simproCustomer?: Customer;

  @Type(() => Site)
  @Expose({ groups: [ClassGroup.MAIN] })
  public site?: Site;

  @Type(() => AssetAttachment)
  @Expose({ name: 'asset_attachments', groups: [ClassGroup.MAIN] })
  public attachments?: Array<AssetAttachment>;

  @Type(() => AssetCustomField)
  @Expose({ name: 'asset_custom_fields', groups: [ClassGroup.MAIN] })
  public customFields?: Array<AssetCustomField>;

  @Type(() => AssetTest)
  @Expose({ name: 'asset_test_records', groups: [ClassGroup.MAIN] })
  public testRecords?: Array<AssetTest>;

  @Type(() => AssetTest)
  @Expose({ name: 'asset_test_record', groups: [ClassGroup.MAIN] })
  public testRecord?: AssetTest;

  @Type(() => Job)
  @Expose({ name: 'job', groups: [ClassGroup.MAIN] })
  public job?: Job;

  @Type(() => Customer)
  @Expose({ name: 'job_customer', groups: [ClassGroup.MAIN] })
  public jobCustomer?: Customer;

  @Type(() => JobSchedule)
  @Expose({ name: 'next_schedule', groups: [ClassGroup.MAIN] })
  public nextSchedule?: JobSchedule;

  @Transform(({ value }) => (value ? DateTime.fromSQL(value) : value), {
    toClassOnly: true
  })
  @Expose({ name: 'no_access_date_1', groups: [ClassGroup.MAIN] })
  public noAccessDate1?: DateTime;

  @Transform(({ value }) => (value ? DateTime.fromSQL(value) : value), {
    toClassOnly: true
  })
  @Expose({ name: 'no_access_date_2', groups: [ClassGroup.MAIN] })
  public noAccessDate2?: DateTime;

  @Transform(({ value }) => (value ? DateTime.fromSQL(value) : value), {
    toClassOnly: true
  })
  @Expose({ name: 'no_access_date_3', groups: [ClassGroup.MAIN] })
  public noAccessDate3?: DateTime;

  @Transform(({ value }) => (value ? DateTime.fromSQL(value) : value), {
    toClassOnly: true
  })
  @Expose({ name: 'no_access_date_4', groups: [ClassGroup.MAIN] })
  public noAccessDate4?: DateTime;

  @Transform(({ value }) => (value ? DateTime.fromSQL(value) : value), {
    toClassOnly: true
  })
  @Expose({ name: 'no_access_date_5', groups: [ClassGroup.MAIN] })
  public noAccessDate5?: DateTime;

  public get isDue(): boolean {
    return this.CP12Status === AssetCp12Status.DUE;
  }

  public get isOverdue(): boolean {
    return this.CP12Status === AssetCp12Status.OVERDUE;
  }

  public get isOnTime(): boolean {
    return this.CP12Status === AssetCp12Status.ON_TIME;
  }

  public get displayedLastCP12Date(): DateTime {
    return this.lastTestDate || this.lastCp12Date;
  }

  constructor(model: Partial<Asset> = {}) {
    Object.assign(this, model);
  }
}
