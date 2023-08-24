export interface Package {
  title: string;
  description: string;
  industryIds: number[];
  keywords: string;
  visibility: number;
  price: number;
  isOpenToLicensing: boolean;
  showPricingPublicly: boolean;
  sellerUserId: string;
  customPatents: string[];
  patents: string[];

  // When package is created
  id: string;
  brokerUserId: string;
  createdTimestamp: string;
  dataroomId: string;
  lastModified: string;
}
