export type DealSize = 'small' | 'medium' | 'large';
export type Timeframe = 'now' | 'soon' | 'browsing';

export interface User {
  id: string;
  avatar: string;
  broker: false;
  businessPhone: string;
  cellPhone: string;
  companyName: string;
  companyImage: string;
  confirmedEmail: boolean;
  dealSizePreference: DealSize;
  dealTimeframePreference: Timeframe;
  description: string; // Company description
  email: string;
  externalUrl: string;
  firstName: string;
  fullName: string;
  interestCountries: string[];
  lastName: string;
  notificationPreferences: {
    emailNotifications: boolean;
  };
  timezone: string;
  title: string;

  accessToken: string;

  privateProfile: boolean;
}
