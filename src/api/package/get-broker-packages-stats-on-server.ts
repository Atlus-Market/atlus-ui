import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { getServerAuthHeaders } from '@/api/api-server';

export interface GetBrokerPackagesStatsResponse {
  downloads: {
    totalDownloads: number;
    packages: {
      downloads: number;
      packageId: string;
    }[];
  };
  noInterested: {
    totalNoInterested: number;
    packages: {
      notInterested: number;
      packageId: string;
    }[];
  };
  shares: {
    totalShares: number;
    packages: {
      shares: number;
      packageId: string;
    }[];
  };
  views: {
    totalViews: number;
    packages: {
      packageId: string;
      views: number;
    }[];
  };

  totalPackages: number;
}

export const getBrokerPackageStatsOnServer = async () => {
  return createRequest<void, GetBrokerPackagesStatsResponse>({
    url: '/packages/broker/stats',
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    headers: await getServerAuthHeaders(),
  }).then(getResponseData);
};
