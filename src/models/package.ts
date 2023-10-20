import { Patent } from '@/models/patent';
import { PackageStatus } from '@/models/package-status';

export interface Package {
  title: string;
  description: string;
  industryIds: number[];
  keywords: string;
  products: string;
  visibility: number;
  priceUsd: number;
  openToLicensing: boolean;
  showPublicPricing: boolean;
  sellerUserId: string;
  patents: Patent[];
  customPatents: Patent[];
  status: PackageStatus;

  // When package is created
  id: string;
  brokerUserId: string;
  createdTimestamp: string;
  dataroomId: string;
  lastModified: string;
}
