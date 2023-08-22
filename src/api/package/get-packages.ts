import { createRequest, ProtectedEndpoint } from '@/api/api';
import { PackageListItem } from '@/models/package-list-item';


export interface GetPackagesResponse {
  packages: PackageListItem[];
}

export const getPackages = () => {
  return createRequest<void, GetPackagesResponse>({
      url: '/packages',
      method: 'GET',
      isProtected: ProtectedEndpoint.True
    }
  );
};
