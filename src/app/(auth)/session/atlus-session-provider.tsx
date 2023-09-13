'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { AtlusSessionHandler } from '@/app/(auth)/session/atlus-session-handler';

/**
 * Wrapper for the next-auth session provider
 * @param children
 * @constructor
 */
export const AtlusSessionProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <AtlusSessionHandler>{children}</AtlusSessionHandler>
    </SessionProvider>
  );
};
