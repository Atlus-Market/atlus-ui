import { createRequest, ProtectedEndpoint } from '@/api/api';
import { getServerAuthHeaders } from '@/api/api-server';
import {
  createGetPackageAccessForUserUrl,
  GetPackageAccessForUserResponse,
} from '@/api/package/access/get-package-access-for-user';

export const getPackageAccessForUserOnServer = async (packageId: string) => {
  return createRequest<void, GetPackageAccessForUserResponse>({
    url: createGetPackageAccessForUserUrl(packageId),
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    headers: await getServerAuthHeaders(),
  });
};
