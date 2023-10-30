import 'server-only';
import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { User } from '@/models/user';
import { getServerAuthHeaders } from '@/api/api-server';

export const getCurrentUserOnServer = async () => {
  return createRequest<void, User>({
    url: '/user',
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    ...{ headers: await getServerAuthHeaders() },
  }).then(getResponseData);
};
