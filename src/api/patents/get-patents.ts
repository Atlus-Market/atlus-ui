import { createRequest, ProtectedEndpoint } from '@/api/api';
import { Patent } from '@/models/patent';
import { sleep } from '@/utils/sleep';
import {
  patentsMock
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/get-patents-mock';

export interface GetPatentsPayload {
  patentsIds: string[];
}

export interface GetPatentsResponse {
  patents: Patent[];
}

export const getPatents = async (getPatentsPayload: GetPatentsPayload): Promise<GetPatentsResponse> => {
  await sleep(3000)
  return {
    patents: patentsMock
  }
  // return createRequest<GetPatentsPayload, GetPatentsResponse>('/patents', 'GET', ProtectedEndpoint.True, getPatentsPayload);
};
