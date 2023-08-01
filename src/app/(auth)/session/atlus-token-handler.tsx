import { ReactNode, useEffect } from 'react';
import { useAtlusSession } from '@/app/(auth)/session/use-atlus-session';
import { AtlusSessionManager } from '@/app/(auth)/session/atlus-session-manager';
import { useCookies } from 'react-cookie';
import * as cookieParser from 'cookie';
import { accessTokenCookieName } from '@/constants/api';

interface AtlusTokenHandlerProps {
  children: ReactNode;
}


type ParsedAccessTokenCookie = {
  [accessTokenCookieName]: string;
  Path: string;
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

  const [cookie, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    AtlusSessionManager.accessToken = accessToken;

    const parsedAccessTokenCookie = cookieParser.parse(accessTokenCookie ?? '') as ParsedAccessTokenCookie;

    if (parsedAccessTokenCookie[accessTokenCookieName]) {
      setCookie(accessTokenCookieName, parsedAccessTokenCookie[accessTokenCookieName], {
        path: '/',
        sameSite: 'strict'
      });
    } else {
      removeCookie(accessTokenCookieName);
    }
  }, [accessToken, removeCookie, accessTokenCookie, setCookie, atlusSession.status]);

  if (atlusSession.status === 'loading') {
    return null;
  }

  return (
    <>
      {children}
    </>
  );
};
