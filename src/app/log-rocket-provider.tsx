'use client';

import { ReactNode, useEffect } from 'react';
import { identifyUser, initLogRocket } from '@/services/logrocket.service';
import { AtlusSessionManager } from '@/app/(auth)/session/atlus-session-manager';

interface LogRocketProviderProps {
  children: ReactNode;
}

export const LogRocketProvider = ({ children }: LogRocketProviderProps) => {
  const user = AtlusSessionManager.user;

  useEffect(() => {
    initLogRocket();
  }, []);

  useEffect(() => {
    if (user) {
      identifyUser({
        id: user.email!,
        email: user.email!,
        name: user.name!,
      });
    }
  }, [user]);

  return <>{children}</>;
};
