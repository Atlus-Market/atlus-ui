import { createRequest, ProtectedEndpoint } from '@/api/api';

export const logout = async (): Promise<void> => {
  return createRequest<void, void>('/logout', 'GET', ProtectedEndpoint.True);
};
