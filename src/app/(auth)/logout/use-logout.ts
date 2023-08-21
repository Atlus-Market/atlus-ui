import { useCallback, useState } from 'react';
import { signOut } from 'next-auth/react';
import { LoginRoute } from '@/constants/routes';

export const useLogout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const logout = useCallback(() => {
    setIsLoggingOut(true);
    signOut({
      callbackUrl: LoginRoute,
      redirect: true
    });
  }, []);

  return {
    logout,
    isLoggingOut
  }
};
