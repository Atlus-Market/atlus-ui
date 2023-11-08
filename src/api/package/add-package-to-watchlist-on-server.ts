import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { getServerAuthHeaders } from '@/api/api-server';

export const addPackageToWatchlistOnServer = async (packageId: string) => {
  return createRequest<void, void>({
    url: `/watchlist/add/${packageId}`,
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    headers: await getServerAuthHeaders(),
  }).then(getResponseData);
};
