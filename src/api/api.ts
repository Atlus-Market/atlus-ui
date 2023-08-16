import axios, { AxiosResponse, CreateAxiosDefaults } from 'axios';
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
    csrfToken: serverSession.user?.csrfToken
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

interface AtlusRequestConfig<T extends unknown> extends CreateAxiosDefaults {
  url: `/${string}`;
  isProtected?: ProtectedEndpoint;
  headers?: Record<string, string>;
  payload?: T;
}

export const createRequest = <Payload, Response>({
                                                   url,
                                                   isProtected = ProtectedEndpoint.False,
                                                   headers = {},
                                                   method,
                                                   payload,
                                                   ...restConfig
                                                 }: AtlusRequestConfig<Payload>
): Promise<Response> => {
  if (isProtected === ProtectedEndpoint.True) {
    setAuthHeaders(headers, AtlusSessionManager);
  }

  return axios<Payload, AxiosResponse<Response>>({
    method,
    url: createUrl(url),
    headers,
    data: payload,
    withCredentials: isProtected === ProtectedEndpoint.True,
    onUploadProgress: (progressEvent) => {
      console.log('progressEvent: ', progressEvent);
      // @ts-ignore
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log('onUploadProgress', percentCompleted);
    },
    ...restConfig
  }).then(response => {
    return response.data;
  });
};
