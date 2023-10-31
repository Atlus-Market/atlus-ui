import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { PackageAccessValue } from '@/models/package-access-value';

export interface GetPackageAccessForUserResponse {
  access: PackageAccessValue;
}

export const createGetPackageAccessForUserUrl = (packageId: string): `/${string}` =>
  `/package/${packageId}/my-access`;

export const getPackageAccessForUser = (packageId: string, signal?: AbortSignal) => {
  return createRequest<void, GetPackageAccessForUserResponse>({
    url: createGetPackageAccessForUserUrl(packageId),
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    signal: signal || undefined,
  }).then(getResponseData);
};
