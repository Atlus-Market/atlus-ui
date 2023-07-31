import { createRequest, ProtectedEndpoint } from '@/api/api';
import { Patent } from '@/models/patent';

export interface GetPatentsPayload {
  ids: string[];
}

export type GetPatentsResponse = Patent[];

export const getPatents = async (getPatentsPayload: GetPatentsPayload): Promise<GetPatentsResponse> => {
  return createRequest<GetPatentsPayload, GetPatentsResponse>('/patents/bulk', 'POST', ProtectedEndpoint.True, getPatentsPayload);
};
