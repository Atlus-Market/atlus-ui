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

  const hasAuthenticatedSession = atlusSession.status === 'authenticated';
  const hasExpiredSession =
    atlusSession.status === 'authenticated' && !!session?.hasAtlusInvalidSession;
  const isLoadingSession = atlusSession.status === 'loading';

  useEffect(() => {
    AtlusSessionManager.session = session;
  }, [atlusSession.status, router, session]);

  useEffect(() => {
    if (pathname === LogoutRoute) {
      return;
    }
    if (hasExpiredSession) {
      router.push(LogoutRoute);
    }
  }, [hasExpiredSession, router, pathname]);

  useEffect(() => {
    if (!isLoadingSession) {
      // Call this to clear Nextjs Cache
      router.refresh();
    }
  }, [hasExpiredSession, hasAuthenticatedSession, isLoadingSession, router]);

  if (isLoadingSession) {
    return null;
  }

  return <>{children}</>;
};
