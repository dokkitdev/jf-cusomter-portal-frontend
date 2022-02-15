import { ClassGroup } from '@shared/class-group';
import { Customer } from '@shared/customer';
import { Site } from '@shared/site';
import { Expose, Transform, Type } from 'class-transformer';
import { DateTime } from 'luxon';
import { AssetAttachment } from './attachment';
import { AssetCustomField } from './custom-field';
import { AssetCp12Status, AssetTestResult } from '../enums';
import { AssetTest } from './test';

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

  @Expose({ name: 'customer_name', groups: [ClassGroup.MAIN] })
  public customerName: string;

  @Expose({ groups: [ClassGroup.MAIN] })
  public make: string;

  @Expose({ groups: [ClassGroup.MAIN] })
  public model: string;

  @Expose({ name: 'last_cp12_date', groups: [ClassGroup.MAIN] })
  public lastCp12Date: AssetCp12Status;

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

  @Transform(({ value }) => (value) ? DateTime.fromISO(value) : value, { toClassOnly: true })
  @Expose({ name: 'last_test_date', groups: [ClassGroup.MAIN] })
  public lastTestDate: DateTime;

  @Transform(({ value }) => (value) ? DateTime.fromISO(value) : value, { toClassOnly: true })
  @Expose({ name: 'next_service_date', groups: [ClassGroup.MAIN] })
  public nextServiceDate: DateTime;

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

  constructor(model: Partial<Asset> = {}) {
    Object.assign(this, model);
  }
}
