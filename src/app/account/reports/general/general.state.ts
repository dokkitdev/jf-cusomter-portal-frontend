export class AccountReportsGeneralPageState {
  public items: any[] = [
    {
      date: '10/06/2025 07:26:12',
      type: 'Asset',
      filename: 'CHL_InstalledEquipment_Daily_202506100726.csv'
    },
    {
      date: '10/06/2025 07:26:12',
      type: 'Warehouse',
      filename: 'CHL_Warehouse_Report_202506100726.csv'
    },
    {
      date: '10/06/2025 07:26:12',
      type: 'Zero',
      filename: 'CHL_Zero_Report_202506100726.csv'
    }
  ];
  public isLoading: boolean = false;
  public sortParameters: any = {};

  constructor() {}
}
