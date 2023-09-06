import { createRequest, ProtectedEndpoint } from '@/api/api';
import { SearchPatentsResponse } from '@/api/patents/search-patents-response';

export interface GetPatentsSimplePayload {
  ids: string[];
}

export interface CustomPatentData {
  publicationNumber: string;
}

export type GetPatentsSimpleResponse = SearchPatentsResponse;

export const getPatentsSimpleBulk = async (
  getPatentsPayload: GetPatentsSimplePayload,
  signal?: AbortSignal
): Promise<GetPatentsSimpleResponse> => {
  return createRequest<GetPatentsSimplePayload, GetPatentsSimpleResponse>({
    url: '/patents/simple/bulk',
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    payload: getPatentsPayload,
    signal,
  });
};
