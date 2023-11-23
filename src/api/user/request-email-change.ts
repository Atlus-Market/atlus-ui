import { updateUser } from '@/api/user/update-user';

export const requestEmailChange = (userId: string, email: string): Promise<void> => {
  return updateUser(userId, { email });
};
