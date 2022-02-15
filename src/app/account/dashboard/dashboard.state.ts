import { DashboardStatistic } from '@shared/dashboard';

export class AccountDashboardPageState {
  public isLoading: boolean;
  public dashboardStatistic: DashboardStatistic;

  constructor() {
    this.isLoading = false;
    this.dashboardStatistic = new DashboardStatistic();
  }
}
