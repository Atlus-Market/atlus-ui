import 'server-only';
import { AuthHeadersProvider, setAuthHeaders } from '@/api/api';
import { cookies } from 'next/headers';
import { accessTokenCookieName } from '@/constants/api';
import {
  getAtlusServerSession,
  ServerSession,
} from '@/app/(auth)/session/get-atlus-server-session';

const mapServerSessionToAuthHeadersProvider = (
  serverSession: ServerSession
): AuthHeadersProvider => {
  return {
    csrfToken: serverSession.user?.csrfToken,
  };
};

export const getServerAuthHeaders = async (
  headers: Record<string, string> = {}
): Promise<Record<string, string>> => {
  const serverSession = await getAtlusServerSession();

  if (!serverSession) {
    return headers;
  }

  const authHeadersProvider = mapServerSessionToAuthHeadersProvider(serverSession);
  setAuthHeaders(headers, authHeadersProvider);

  const accessTokenCookie = cookies().get(accessTokenCookieName)?.value ?? '';
  headers['Cookie'] = `${accessTokenCookieName}=${accessTokenCookie}`;

  return headers;
};
