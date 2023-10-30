import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LogoutRoute } from '@/constants/routes';

export const useLogout = () => {
  const router = useRouter();
  return useCallback(() => {
    router.push(LogoutRoute);
  }, [router]);
};
