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
  headers['X-CSRF-TOKEN'] = provider.csrfToken ?? '';
  return headers;
};

export interface AtlusRequestConfig<T extends unknown> extends CreateAxiosDefaults {
  url: `/${string}`;
  isProtected?: ProtectedEndpoint;
  headers?: Record<string, string>;
  payload?: T;
}

export type AtlusResponse<T extends unknown> = AxiosResponse<T>;

export const createRequest = <Payload, ResponsePayload>({
  url,
  isProtected = ProtectedEndpoint.False,
  headers = {},
  method,
  payload,
  responseType = 'json', // Default to JSON response
  ...restConfig
}: AtlusRequestConfig<Payload>): Promise<AtlusResponse<ResponsePayload>> => {
  if (isProtected === ProtectedEndpoint.True && !isRunningOnServer()) {
    setAuthHeaders(headers, AtlusSessionManager);
  }

  return axios<Payload, AtlusResponse<ResponsePayload>>({
    method,
    url: createUrl(url),
    headers,
    data: payload,
    withCredentials: isProtected === ProtectedEndpoint.True,
    responseType, // Set responseType based on the expected response type
    ...restConfig,
  });
};

export const getProgressPercent = (progressEvent: AxiosProgressEvent): number => {
  return Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
};

export const getResponseData = <T extends unknown>(response: AxiosResponse<T>): T => response.data;
