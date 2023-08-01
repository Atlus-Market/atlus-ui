'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { AtlusTokenHandler } from '@/app/(auth)/session/atlus-token-handler';
import { CookiesProvider } from 'react-cookie';

/**
 * Wrapper for the next-auth session provider
 * @param children
 * @constructor
 */
export const AtlusSessionProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CookiesProvider>
      <SessionProvider>
        <AtlusTokenHandler>
          {children}
        </AtlusTokenHandler>
      </SessionProvider>
    </CookiesProvider>
  );
};
