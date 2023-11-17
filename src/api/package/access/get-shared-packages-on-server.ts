import 'server-only';
import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { getServerAuthHeaders } from '@/api/api-server';
import { BasePackage } from '@/api/package/search/search-packages';

export const getSharedPackagesOnServer = async (): Promise<BasePackage[]> => {
  return createRequest<void, { packages: BasePackage[] }>({
    url: '/shared-packages',
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    headers: await getServerAuthHeaders(),
  })
    .then(getResponseData)
    .then(data => data.packages);
};
