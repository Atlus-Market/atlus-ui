'use client';
import { ReactNode, useEffect } from 'react';
import { useAtlusSession } from '@/app/(auth)/session/use-atlus-session';
import { AtlusSessionManager } from '@/app/(auth)/session/atlus-session-manager';
import { usePathname, useRouter } from 'next/navigation';
import { LogoutRoute } from '@/constants/routes';

interface AtlusTokenHandlerProps {
  children: ReactNode;
}

/**
 * Wrapper to listen for accessToken changes and save it in the manager class.
 * @param children
 * @constructor
 */
export const AtlusSessionHandler = ({ children }: AtlusTokenHandlerProps) => {
  const atlusSession = useAtlusSession();
  const session = atlusSession.data;
  const router = useRouter();
  const pathname = usePathname();

  const hasExpiredSession =
    atlusSession.status === 'authenticated' && session?.hasAtlusInvalidSession;

  useEffect(() => {
    AtlusSessionManager.session = session;
  }, [atlusSession.status, session]);

  useEffect(() => {
    console.log(pathname);
    if (pathname === LogoutRoute) {
      return;
    }
    if (hasExpiredSession) {
      router.push(LogoutRoute);
    }
  }, [hasExpiredSession, router, pathname]);

  if (atlusSession.status === 'loading') {
    return null;
  }

  return <>{children}</>;
};
