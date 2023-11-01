import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { User } from '@/models/user';

export const getCurrentUser = async () => {
  return createRequest<void, User>({
    url: '/user',
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
  }).then(getResponseData);
};
