import { useSession } from 'next-auth/react';

export const useAtlusSession = () => {
  return useSession();
};
