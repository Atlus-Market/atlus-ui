import 'server-only';
import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { getServerAuthHeaders } from '@/api/api-server';
import { PackageStatus } from '@/models/package-status';

export interface BuyerPackageData {
  id: string;
  broker_company: string;
  broker_name: string;
  broker_user_id: string;
  documents_count: number;
  families_count: number;
  is_watched: boolean;
  status: PackageStatus;
  thumbnail_patent_id: number;
  title: string;
}

export const getSharedPackagesOnServer = async (): Promise<BuyerPackageData[]> => {
  return createRequest<void, { packages: BuyerPackageData[] }>({
    url: '/shared-packages',
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    headers: await getServerAuthHeaders(),
  })
    .then(getResponseData)
    .then(data => data.packages);
};