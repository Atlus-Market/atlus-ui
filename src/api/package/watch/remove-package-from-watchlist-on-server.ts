import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { getServerAuthHeaders } from '@/api/api-server';

export const removePackageFromWatchlistOnServer = async (packageId: string) => {
  return createRequest<void, void>({
    url: `/watchlist/remove/${packageId}`,
    method: 'DELETE',
    isProtected: ProtectedEndpoint.True,
    headers: await getServerAuthHeaders(),
  }).then(getResponseData);
};
