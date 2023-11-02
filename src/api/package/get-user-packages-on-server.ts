import 'server-only';
import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { getServerAuthHeaders } from '@/api/api-server';
import { createGetUserPackagesUrl, GetPackagesResponse } from '@/api/package/get-user-packages';

export const getUserPackagesOnServer = async (
  userId: string
): Promise<GetPackagesResponse['packages']> => {
  return createRequest<void, GetPackagesResponse>({
    url: createGetUserPackagesUrl(userId),
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    headers: await getServerAuthHeaders(),
  })
    .then(getResponseData)
    .then(data => data.packages);
};
