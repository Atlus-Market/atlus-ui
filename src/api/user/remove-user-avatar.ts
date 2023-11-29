import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';

export const removeUserAvatar = (): Promise<void> => {
  return createRequest<void, void>({
    url: '/user/avatar',
    method: 'DELETE',
    isProtected: ProtectedEndpoint.True,
  }).then(getResponseData);
};
