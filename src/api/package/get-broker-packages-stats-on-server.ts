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
  totalPackages: number;
  totalShares: number;
  views: {
    totalViews: number;
    packages: {
      packageId: string;
      views: number;
    }[];
  };
}

export const getBrokerPackageStatsOnServer = async () => {
  return createRequest<void, GetBrokerPackagesStatsResponse>({
    url: '/packages/broker/stats',
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    headers: await getServerAuthHeaders(),
  }).then(getResponseData);
};
