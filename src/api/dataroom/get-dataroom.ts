import { createRequest, ProtectedEndpoint } from '@/api/api';
import { Dataroom } from '@/models/dataroom';

export const getDataroom = (dataroomId: string): Promise<Dataroom> => {
  return createRequest<void, Dataroom>({
    url: `/dataroom/${dataroomId}`,
    method: 'GET',
    isProtected: ProtectedEndpoint.True
  });
};
