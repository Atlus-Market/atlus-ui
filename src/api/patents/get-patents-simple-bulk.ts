import { createRequest, ProtectedEndpoint } from '@/api/api';
import { Patent } from '@/models/patent';

export interface GetPatentsSimplePayload {
  ids: string[];
}

export interface CustomPatentData {
  publicationNumber: string;
}

export interface GetPatentsSimpleResponse {
  customPatents: CustomPatentData[];
  patents: Patent[];
}

export const getPatentsSimpleBulk = async (getPatentsPayload: GetPatentsSimplePayload, signal?: AbortSignal): Promise<GetPatentsSimpleResponse> => {
  return createRequest<GetPatentsSimplePayload, GetPatentsSimpleResponse>({
    url: '/patents/simple/bulk',
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    payload: getPatentsPayload,
    signal
  });
};
