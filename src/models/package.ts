import { Patent } from '@/models/patent';

export interface Package {
  title: string;
  description: string;
  industryIds: number[];
  keywords: string;
  visibility: number;
  priceUsd: number;
  openToLicensing: boolean;
  showPublicPricing: boolean;
  sellerUserId: string;
  patents: Patent[];
  customPatents: Patent[];

  // When package is created
  id: string;
  brokerUserId: string;
  createdTimestamp: string;
  dataroomId: string;
  lastModified: string;
}
