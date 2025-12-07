import { InvestmentDetails, UserProfile } from './types';

export const LOGIN_CREDENTIALS = {
  email: 'surajb3266@gmail.com',
  password: 'Suraj@1999',
};

export const MOCK_USER: UserProfile = {
  name: 'Suraj Biradar',
  email: 'surajb3266@gmail.com',
  panNumber: 'DRDPB3517A',
};

export const INVESTMENT_DATA: InvestmentDetails = {
  fundName: 'SBI ELSS Fund',
  investedAmount: 180000,
  startDate: '2024-04-12',
  lockInPeriodYears: 3,
  currentReturnPercentage: 4,
  withdrawalAllowedMonths: 24,
};

export const COMPANY_DETAILS = {
  name: 'Rakesh Associates',
  tagline: 'Trusted Investment Management',
  address: '1402, SBC Park, Baner, Pune – 411045',
  fundManager: 'Rakesh Gupta',
  email: 'support@rakeshassociates.com',
};