import {
  AtlusAuthRequestHeaders,
  createRequest,
  getResponseData,
  ProtectedEndpoint,
} from '@/api/api';
import { Package } from '@/models/package';

export interface GetPackageResponse {
  package: Package;
}

export const createGetPackageUrl = (packageId: string): `/${string}` => `/package/${packageId}`;

export const getPackage = (
  packageId: string,
  atlusAuthRequestHeaders?: AtlusAuthRequestHeaders,
  signal?: AbortSignal
) => {
  return createRequest<void, GetPackageResponse>({
    url: createGetPackageUrl(packageId),
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    signal,
    ...atlusAuthRequestHeaders,
  }).then(getResponseData);
};
