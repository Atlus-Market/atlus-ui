import { createRequest, ProtectedEndpoint } from '@/api/api';
import { CreateUserPayload } from '@/api/user/create-user';

export type UpdateUserPayload = Partial<CreateUserPayload>;

export const updateUser = (userId: string, updateUserPayload: UpdateUserPayload): Promise<void> => {
  return createRequest<UpdateUserPayload, void>({
    url: `/user/${userId}`,
    method: 'PUT',
    isProtected: ProtectedEndpoint.True,
    payload: updateUserPayload
  });
};
