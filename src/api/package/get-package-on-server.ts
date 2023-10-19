import 'server-only';
import { createGetPackageUrl, GetPackageResponse } from '@/api/package/get-package';
import { getServerAuthHeaders } from '@/api/api-server';
import { AtlusResponse, createRequest, ProtectedEndpoint } from '@/api/api';

export const getPackageOnServer = async (
  packageId: string
): Promise<AtlusResponse<GetPackageResponse>> => {
  return createRequest<void, GetPackageResponse>({
    url: createGetPackageUrl(packageId),
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    headers: await getServerAuthHeaders(),
  });
};
