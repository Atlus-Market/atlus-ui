import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { PackageListItem } from '@/models/package-list-item';

export interface GetPackagesResponse {
  packages: PackageListItem[];
}

export const createGetUserPackagesUrl = (userId: string): `/${string}` =>
  `/packages/user/${userId}`;

export const getUserPackages = (userId: string, signal?: AbortSignal) => {
  return createRequest<void, GetPackagesResponse>({
    url: createGetUserPackagesUrl(userId),
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    signal: signal || undefined,
  }).then(getResponseData);
};
