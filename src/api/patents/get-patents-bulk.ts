import { createRequest, ProtectedEndpoint } from '@/api/api';
import { Patent } from '@/models/patent';

export interface GetPatentsBulkPayload {
  ids: string[];
}

export interface GetPatentsBulkResponse {
  count: number;
  patents: Patent[];
}

export const getPatentsBulk = async (getPatentsPayload: GetPatentsBulkPayload): Promise<GetPatentsBulkResponse> => {
  return createRequest<GetPatentsBulkPayload, GetPatentsBulkResponse>({
    url: '/patents/bulk',
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    payload: getPatentsPayload
  });
};
