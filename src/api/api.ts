import axios, { AxiosProgressEvent, AxiosResponse, CreateAxiosDefaults } from 'axios';
import { AtlusSessionManager } from '@/app/(auth)/session/atlus-session-manager';
import { isRunningOnServer } from '@/utils/env';

export const isRequestCanceledError = (e: Error): boolean => {
  return axios.isCancel(e);
};

export const createUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${process.env.NEXT_PUBLIC_API_ENDPOINT}${cleanEndpoint}`;
};

export enum ProtectedEndpoint {
  True = 1,
  False = 0,
}

export type AtlusAuthRequestHeaders = Pick<AtlusRequestConfig<void>, 'headers'>;

export interface AuthHeadersProvider {
  accessToken: string | undefined;
  csrfToken: string | undefined;
}

export const setAuthHeaders = (
  headers: Record<string, string>,
  provider: AuthHeadersProvider
): Record<string, string> => {
  headers['Authorization'] = `Bearer ${provider.accessToken}`;
  headers['X-CSRF-TOKEN'] = provider.csrfToken ?? '';
  return headers;
};

export interface AtlusRequestConfig<T extends unknown> extends CreateAxiosDefaults {
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
}: AtlusRequestConfig<Payload>): Promise<Response> => {
  if (isProtected === ProtectedEndpoint.True && !isRunningOnServer()) {
    setAuthHeaders(headers, AtlusSessionManager);
  }

  return axios<Payload, AxiosResponse<Response>>({
    method,
    url: createUrl(url),
    headers,
    data: payload,
    withCredentials: isProtected === ProtectedEndpoint.True,
    ...restConfig,
  }).then(response => {
    return response.data;
  });
};

export const getProgressPercent = (progressEvent: AxiosProgressEvent): number => {
  // @ts-ignore
  return Math.round((progressEvent.loaded * 100) / progressEvent.total);
};
