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
export const AtlusTokenHandler = ({ children }: AtlusTokenHandlerProps) => {
  const atlusSession = useAtlusSession();
  const accessToken = atlusSession.data?.user?.accessToken;

  useEffect(() => {
    AtlusSessionManager.accessToken = accessToken;
  }, [accessToken]);

  return (
    <>
      {children}
    </>
  );
};
