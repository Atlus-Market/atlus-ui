import 'server-only';

import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/app/(auth)/auht-options';
import { AuthHeadersProvider, setAuthHeaders } from '@/api/api';
import { cookies } from 'next/headers';
import { accessTokenCookieName } from '@/constants/api';

const mapServerSessionToAuthHeadersProvider = (serverSession: Session): AuthHeadersProvider => {
  return {
    accessToken: serverSession.user?.accessToken,
    csrfToken: serverSession.user?.csrfToken,
  };
};

export const getServerAuthHeaders = async (
  headers: Record<string, string> = {}
): Promise<Record<string, string>> => {
  const serverSession = await getServerSession(authOptions);

  if (!serverSession) {
    throw new Error('No server session found.');
  }

  const authHeadersProvider = mapServerSessionToAuthHeadersProvider(serverSession);
  setAuthHeaders(headers, authHeadersProvider);

  const accessTokenCookie = cookies().get(accessTokenCookieName)?.value ?? '';
  headers['Cookie'] = `${accessTokenCookieName}=${accessTokenCookie}`;

  return headers;
};
