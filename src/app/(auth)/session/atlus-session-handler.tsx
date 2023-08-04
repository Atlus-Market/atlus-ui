import { ReactNode, useEffect } from 'react';
import { useAtlusSession } from '@/app/(auth)/session/use-atlus-session';
import { AtlusSessionManager } from '@/app/(auth)/session/atlus-session-manager';

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

  useEffect(() => {
    AtlusSessionManager.session = session;
  }, [atlusSession.status, session]);

  if (atlusSession.status === 'loading') {
    return null;
  }

  return (
    <>
      {children}
    </>
  );
};
