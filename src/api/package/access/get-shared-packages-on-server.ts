import 'server-only';
import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { getServerAuthHeaders } from '@/api/api-server';
import { PackageStatus } from '@/models/package-status';
import { Visibility } from '@/components/common/dropdown/visibility-options';

export interface BuyerPackageData {
  id: string;
  brokerCompany: string;
  brokerName: string;
  brokerUserId: string;
  documentsCount: number;
  familiesCount: number;
  isWatched: boolean;
  status: PackageStatus;
  thumbnailPatentId: number;
  title: string;
  visibility: Visibility;
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
