import { ReactNode, useEffect } from 'react';
import { useAtlusSession } from '@/app/(auth)/session/use-atlus-session';
import { AtlusSessionManager } from '@/app/(auth)/session/atlus-session-manager';
import { useCookies } from 'react-cookie';

import { accessTokenCookieName, csrfAccessTokenName } from '@/constants/api';

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
  const accessTokenCookie = atlusSession.data?.user?.accessTokenCookie;
  const csrfToken = atlusSession.data?.user?.csrfToken;

  const [cookie, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    AtlusSessionManager.accessToken = accessToken;
    AtlusSessionManager.csrfToken = csrfToken;

    if (accessTokenCookie) {
      setCookie(accessTokenCookieName, accessTokenCookie, {
        path: '/',
        sameSite: 'strict'
      });
    } else {
      removeCookie(accessTokenCookieName);
    }

  }, [accessToken, csrfToken, accessTokenCookie, removeCookie, setCookie, atlusSession.status]);

  if (atlusSession.status === 'loading') {
    return null;
  }

  return (
    <>
      {children}
    </>
  );
};
