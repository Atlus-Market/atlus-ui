import 'server-only';
import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { getServerAuthHeaders } from '@/api/api-server';
import { BuyerPackageData } from '@/api/package/access/get-shared-packages-on-server';

export const getRecommendedPackagesOnServer = async (): Promise<BuyerPackageData[]> => {
  return createRequest<void, { packages: BuyerPackageData[] }>({
    url: '/package/recommendations',
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    headers: await getServerAuthHeaders(),
  })
    .then(getResponseData)
    .then(data => {
      return data.packages;
    });
};
