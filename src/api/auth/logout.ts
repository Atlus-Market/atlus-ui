import { createUrl, mapServerSessionToAuthHeadersProvider, setAuthHeaders } from '@/api/api';
import axios, { AxiosResponse } from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/(auth)/auht-options';
import { cookies } from 'next/headers';
import { accessTokenCookieName } from '@/constants/api';

export const logout = async (): Promise<void> => {
  const serverSession = await getServerSession(authOptions);

  if (!serverSession) {
    throw new Error('No server session found');
  }

  const authHeadersProvider = mapServerSessionToAuthHeadersProvider(serverSession);
  const headers: Record<string, string> = {};
  setAuthHeaders(headers, authHeadersProvider);
  headers['Cookie'] = cookies().get(accessTokenCookieName)?.value ?? '';

  await axios<void, AxiosResponse<Response>>({
    method: 'GET',
    url: createUrl('/logout'),
    headers,
    withCredentials: true
  });
};

