import { createRequest, ProtectedEndpoint } from '@/api/api';
import { CreateUserPayload } from '@/api/user/create-user';

export type UpdateUserPayload = Partial<CreateUserPayload>;

export const updateUser = (userId: string, updateUserPayload: UpdateUserPayload): Promise<void> => {
  return createRequest<UpdateUserPayload, void>(`/user/${userId}`, 'PUT', ProtectedEndpoint.True, updateUserPayload);
};
