import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';

export const requestDeleteAccount = (): Promise<void> => {
  return createRequest<void, void>({
    url: '/user/request-delete',
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
  }).then(getResponseData);
};
