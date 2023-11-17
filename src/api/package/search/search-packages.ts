import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { PackageStatus } from '@/models/package-status';
import { Visibility } from '@/components/common/dropdown/visibility-options';
import { Package } from '@/models/package';

export interface SearchPackagesParams {
  q: string;
  page: number; // First page starts at 1
  per_page: number;
}

export interface BasePackage extends Pick<Package, 'views' | 'shares' | 'downloads'> {
  brokerCompany: string;
  brokerName: string;
  brokerUserId: string;
  description: string;
  numberOfDocuments: number;
  numberOfFamilies: number;
  id: string;
  isWatched: boolean;
  priceUsd: number;
  status: PackageStatus;
  thumbnailPatentId: number;
  title: string;
  visibility: Visibility;

  createdTimestamp: string;
  lastModified: string;
}

export interface SearchPackagesResponse {
  packages: BasePackage[];
  query: string;
  currentPage: number;
  perPage: number;
  totalPages: number;
  totalResults: number;
  type: 'broker' | 'buyer';
}

export const createSearchPackagesUrl = (
  searchPackagesParams: SearchPackagesParams
): `/${string}` => {
  const urlSearchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(searchPackagesParams)) {
    urlSearchParams.append(key, String(value));
  }
  return `/packages/search?${urlSearchParams.toString()}`;
};

export const searchPackages = async (
  params: SearchPackagesParams
): Promise<SearchPackagesResponse> => {
  return createRequest<void, SearchPackagesResponse>({
    url: createSearchPackagesUrl(params),
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
  })
    .then(getResponseData)
    .then(data => {
      console.log(data);
      return data;
    });
};
