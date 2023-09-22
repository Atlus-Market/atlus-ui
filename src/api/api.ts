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
  returnRawResponse?: boolean;
}

export const createRequest = <Payload, ResponsePayload>({
  url,
  isProtected = ProtectedEndpoint.False,
  headers = {},
  method,
  payload,
  responseType = 'json', // Default to JSON response
  returnRawResponse = false,
  ...restConfig
}: AtlusRequestConfig<Payload>): Promise<ResponsePayload> => {
  if (isProtected === ProtectedEndpoint.True && !isRunningOnServer()) {
    setAuthHeaders(headers, AtlusSessionManager);
  }

  return axios<Payload, AxiosResponse<ResponsePayload> | ResponsePayload>({
    method,
    url: createUrl(url),
    headers,
    data: payload,
    withCredentials: isProtected === ProtectedEndpoint.True,
    responseType, // Set responseType based on the expected response type
    ...restConfig,
  }).then(response => {
    if (returnRawResponse) {
      return response;
    }
    return (response as AxiosResponse).data;
  });
};

export const getProgressPercent = (progressEvent: AxiosProgressEvent): number => {
  // @ts-ignore
  return Math.round((progressEvent.loaded * 100) / progressEvent.total);
};
