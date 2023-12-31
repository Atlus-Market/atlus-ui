import { createRequest, ProtectedEndpoint } from '@/api/api';
import { Package } from '@/models/package';

export interface GetPackageResponse {
  package: Package;
}

export const getPackage = (packageId: string) => {
  return createRequest<void, GetPackageResponse>({
    url: `/package/${packageId}`,
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
  });
};
