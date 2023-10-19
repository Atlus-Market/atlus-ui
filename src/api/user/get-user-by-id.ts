import {
  AtlusAuthRequestHeaders,
  createRequest,
  getResponseData,
  ProtectedEndpoint,
} from '@/api/api';
import { CreateUserPayload } from '@/api/user/create-user';
import { User } from '@/models/user';

export const getUserById = (
  userId: string,
  atlusAuthRequestHeaders?: AtlusAuthRequestHeaders
): Promise<User> => {
  return createRequest<CreateUserPayload, User>({
    url: `/user/${userId}`,
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    ...atlusAuthRequestHeaders,
  }).then(getResponseData);
};
