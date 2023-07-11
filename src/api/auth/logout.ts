import { createRequest } from '@/api/api';

export const logout = (): Promise<void> => {
  return createRequest<void, void>('/logout', 'GET');
};
