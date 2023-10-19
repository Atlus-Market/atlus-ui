import {
  AtlusAuthRequestHeaders,
  createRequest,
  getResponseData,
  ProtectedEndpoint,
} from '@/api/api';
import { Dataroom } from '@/models/dataroom';

export const getDataroom = (
  dataroomId: string,
  authRequestHeaders?: AtlusAuthRequestHeaders
): Promise<Dataroom> => {
  return createRequest<void, Dataroom>({
    url: `/dataroom/${dataroomId}`,
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    ...authRequestHeaders,
  }).then(getResponseData);
};
