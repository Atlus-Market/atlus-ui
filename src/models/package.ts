import { Patent } from '@/models/patent';
import { PackageStatus } from '@/models/package-status';
import { Visibility } from '@/components/common/dropdown/visibility-options';

export interface Package {
  title: string;
  description: string;
  industryIds: number[];
  keywords: string[];
  products: string[];
  containsSep: boolean;
  sepStandardIds: string[];
  visibility: Visibility;
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

  numberOfDocuments: number;
  numberOfFamilies: number;
  numberOfPatentsAssets: number;

  // Stats
  downloads: number;
  shares: number;
  views: number;
}
