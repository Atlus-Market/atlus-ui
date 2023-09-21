import 'server-only';
import { getUserById } from '@/api/user/get-user-by-id';
import { getServerAuthHeaders } from '@/api/api-server';
import { User } from '@/models/user';

export const getUserByIdOnServer = async (userId: string): Promise<User> => {
  return getUserById(userId, { headers: await getServerAuthHeaders() });
};
