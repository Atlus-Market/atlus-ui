export type DealSize = 'small' | 'medium' | 'large';
export type Timeframe = 'now' | 'soon' | 'browsing';

export interface User {
  broker: false;
  business_phone: string;
  cell_phone: string;
  company_name: string;
  confirmed_email: boolean;
  deal_size_preference: DealSize;
  deal_timeframe_preference: Timeframe;
  description: string;
  email: string;
  external_url: string;
  first_name: string;
  full_name: string;
  id: string;
  interest_countries: string[];
  last_name: string;
  notification_preferences: {
    email_notifications: boolean;
  };
  timezone: string;
  title: string;

  accessToken: string;
}
