export type DealSize = 'small' | 'medium' | 'large';
export type Timeframe = 'now' | 'soon' | 'browsing';

export interface User {
  broker: false;
  businessPhone: string;
  cellPhone: string;
  companyName: string;
  confirmedEmail: boolean;
  dealSizePreference: DealSize;
  dealTimeframePreference: Timeframe;
  description: string;
  email: string;
  externalUrl: string;
  firstName: string;
  fullName: string;
  id: string;
  interestCountries: string[];
  lastName: string;
  notificationPreferences: {
    emailNotifications: boolean;
  };
  timezone: string;
  title: string;

  accessToken: string;
}
