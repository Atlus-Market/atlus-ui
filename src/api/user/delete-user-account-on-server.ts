import 'server-only';
import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { getServerAuthHeaders } from '@/api/api-server';

export const deleteUserAccountOnServer = async (token: string) => {
  return createRequest<void, void>({
    url: `/user/confirm-delete/${token}`,
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    ...{ headers: await getServerAuthHeaders() },
  }).then(getResponseData);
};
