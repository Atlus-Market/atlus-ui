import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { Package } from '@/models/package';
import { BuyerPackageData } from '@/api/package/access/get-shared-packages-on-server';

export interface SearchPackagesParams {
  q: string;
  page: number;
  per_page: number;
}

export type SearchResultPackage = BuyerPackageData | Package;

export interface SearchPackagesResponse {
  packages: SearchResultPackage[];
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
  console.log(`Searching packages: /packages/search?${urlSearchParams.toString()}`);
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
