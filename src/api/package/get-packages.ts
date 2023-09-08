import { createRequest, ProtectedEndpoint } from '@/api/api';
import { PackageListItem } from '@/models/package-list-item';


export interface GetPackagesResponse {
  packages: PackageListItem[];
}

export const getPackages = (userId: string, signal?: AbortSignal) => {
  return createRequest<void, GetPackagesResponse>({
      url: `/packages/user/${userId}`,
      method: 'GET',
      isProtected: ProtectedEndpoint.True,
      signal: signal || undefined
    }
  );
};
