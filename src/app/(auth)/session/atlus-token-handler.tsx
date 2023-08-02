import { ReactNode, useEffect } from 'react';
import { useAtlusSession } from '@/app/(auth)/session/use-atlus-session';
import { AtlusSessionManager } from '@/app/(auth)/session/atlus-session-manager';
import { useCookies } from 'react-cookie';

import { accessTokenCookieName } from '@/constants/api';

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
  const session = atlusSession.data;
  const [cookie, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    AtlusSessionManager.session = session;
    const accessTokenCookie = session?.user?.accessTokenCookie;

    if (accessTokenCookie) {
      setCookie(accessTokenCookieName, accessTokenCookie, {
        path: '/',
        sameSite: 'strict'
      });
    } else {
      removeCookie(accessTokenCookieName);
    }

  }, [removeCookie, setCookie, atlusSession.status, session]);

  if (atlusSession.status === 'loading') {
    return null;
  }

  return (
    <>
      {children}
    </>
  );
};
