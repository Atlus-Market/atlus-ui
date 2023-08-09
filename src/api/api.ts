import axios, { AxiosResponse, Method } from 'axios';
import { AtlusSessionManager } from '@/app/(auth)/session/atlus-session-manager';
import { Session } from 'next-auth';

export const createUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${process.env.NEXT_PUBLIC_API_ENDPOINT}${cleanEndpoint}`;
};

export enum ProtectedEndpoint {
  True = 1,
  False = 0,
}

interface AuthHeadersProvider {
  accessToken: string | undefined;
  csrfToken: string | undefined;
}

export const mapServerSessionToAuthHeadersProvider = (
  serverSession: Session
): AuthHeadersProvider => {
  return {
    accessToken: serverSession.user?.accessToken,
    csrfToken: serverSession.user?.csrfToken,
  };
};

export const setAuthHeaders = (
  headers: Record<string, string>,
  provider: AuthHeadersProvider
): Record<string, string> => {
  headers['Authorization'] = `Bearer ${provider.accessToken}`;
  headers['X-CSRF-TOKEN'] = provider.csrfToken ?? '';
  return headers;
};

export const createRequest = <Payload, Response>(
  endpoint: `/${string}`,
  method: Method,
  isProtected: ProtectedEndpoint = ProtectedEndpoint.False,
  payload?: Payload | undefined
): Promise<Response> => {
  const headers = {};
  if (isProtected === ProtectedEndpoint.True) {
    setAuthHeaders(headers, AtlusSessionManager);
  }

  return axios<Payload, AxiosResponse<Response>>({
    method,
    url: createUrl(endpoint),
    headers,
    data: payload,
    withCredentials: isProtected === ProtectedEndpoint.True,
  }).then(response => {
    return response.data;
  });
};
