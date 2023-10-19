import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { PackageAccess } from '@/models/package-access';

export interface GetPackageAccessResponse {
  packageAccess: PackageAccess[];
}

export const getPackageAccess = (packageId: string, signal?: AbortSignal) => {
  return createRequest<void, GetPackageAccessResponse>({
    url: `/package/${packageId}/access`,
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    signal: signal || undefined,
  }).then(getResponseData);
};
