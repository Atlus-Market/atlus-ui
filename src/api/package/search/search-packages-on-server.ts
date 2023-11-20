import 'server-only';
import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { getServerAuthHeaders } from '@/api/api-server';
import {
  createSearchPackagesUrl,
  SearchPackagesParams,
  SearchPackagesResponse,
} from '@/api/package/search/search-packages';

export const searchPackagesOnServer = async (
  params: SearchPackagesParams
): Promise<SearchPackagesResponse> => {
  return createRequest<void, SearchPackagesResponse>({
    url: createSearchPackagesUrl(params),
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    headers: await getServerAuthHeaders(),
  }).then(getResponseData);
};
