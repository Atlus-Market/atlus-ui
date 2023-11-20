import 'server-only';
import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { User } from '@/models/user';
import { getServerAuthHeaders } from '@/api/api-server';
import { cache } from 'react';

export const revalidate = 5 * 60;

export const getCurrentUserOnServer = cache(async () => {
  return createRequest<void, User>({
    url: '/user',
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    ...{ headers: await getServerAuthHeaders() },
  }).then(getResponseData);
});
