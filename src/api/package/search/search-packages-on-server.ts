import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { getServerAuthHeaders } from '@/api/api-server';
import { Package } from '@/models/package';

interface SearchPackagesParams {
  q: string;
  page: number;
  per_page: number;
  // userType: 'broker' | 'buyer';
}

interface SearchPackagesResponse {
  currentPage: number;
  packages: Package[];
  query: string;
  totalResults: number;
}

export const searchPackagesOnServer = async (
  params: SearchPackagesParams
): Promise<SearchPackagesResponse> => {
  const urlSearchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    urlSearchParams.append(key, String(value));
  }

  return createRequest<void, SearchPackagesResponse>({
    url: `/packages/search?${urlSearchParams.toString()}`,
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    headers: await getServerAuthHeaders(),
  }).then(getResponseData);
};
