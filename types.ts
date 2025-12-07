export interface UserProfile {
  name: string;
  email: string;
  panNumber: string;
  avatarUrl?: string;
}

export interface InvestmentDetails {
  fundName: string;
  investedAmount: number;
  startDate: string; // ISO Date string
  lockInPeriodYears: number;
  currentReturnPercentage: number;
  withdrawalAllowedMonths: number;
}

export enum Page {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  PROFILE = 'PROFILE',
  SUPPORT = 'SUPPORT',
}

export interface ChartDataPoint {
  date: string;
  value: number;
  invested: number;
}