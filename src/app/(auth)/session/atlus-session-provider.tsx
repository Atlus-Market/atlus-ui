'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { AtlusTokenHandler } from '@/app/(auth)/session/atlus-token-handler';

/**
 * Wrapper for the next-auth session provider
 * @param children
 * @constructor
 */
export const AtlusSessionProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <AtlusTokenHandler>
        {children}
      </AtlusTokenHandler>
    </SessionProvider>
  );
};
