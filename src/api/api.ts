import axios, { AxiosResponse, Method } from 'axios';
import { AtlusSessionManager } from '@/app/(auth)/session/atlus-session-manager';

const createUrl = (host: string, endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${host}:${process.env.NEXT_PUBLIC_API_ENDPOINT_PORT}${cleanEndpoint}`;
};

export const createServerUrl = (endpoint: string): string => {
  return createUrl(process.env.API_ENDPOINT ?? '', endpoint);
};

export const createClientUrl = (endpoint: string): string => {
  return createUrl(process.env.NEXT_PUBLIC_API_ENDPOINT ?? '', endpoint);
};

export enum ProtectedEndpoint {
  True = 1,
  False = 0
}

const setAuthHeader = (headers: Record<string, string>, isProtected: ProtectedEndpoint): Record<string, string> => {
  if (isProtected === ProtectedEndpoint.True) {
    headers['Authorization'] = `Bearer ${AtlusSessionManager.accessToken}`;
    headers['X-CSRF-TOKEN'] = AtlusSessionManager.csrfToken ?? '';
  }
  return headers;
};

export const createRequest = <Payload, Response>(
  endpoint: `/${string}`,
  method: Method,
  isProtected: ProtectedEndpoint = ProtectedEndpoint.False,
  payload?: Payload | undefined
): Promise<Response> => {
  const headers = {};
  setAuthHeader(headers, isProtected);
  return axios<Payload, AxiosResponse<Response>>({
    method,
    url: createClientUrl(endpoint),
    headers,
    data: payload,
    withCredentials: isProtected === ProtectedEndpoint.True
  }).then(response => {
    return response.data;
  });
};
