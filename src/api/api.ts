import axios, { AxiosResponse, Method } from 'axios';
import { AtlusSessionManager } from '@/app/(auth)/session/atlus-session-manager';

const createUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_API_ENDPOINT_PORT}${cleanEndpoint}`;
};

export enum ProtectedEndpoint {
  True = 1,
  False = 0
}

const setAuthHeader = (headers: Record<string, string>, isProtected: ProtectedEndpoint): Record<string, string> => {
  if (isProtected === ProtectedEndpoint.True) {
    headers['Authorization'] = `Bearer ${AtlusSessionManager.accessToken}`;
  }
  return headers;
};

export const createRequest = <Payload, Response>(
  endpoint: `/${string}`,
  method: Method,
  isProtected: ProtectedEndpoint = ProtectedEndpoint.False,
  payload?: Payload | undefined,
): Promise<Response> => {
  const headers = {};
  setAuthHeader(headers, isProtected);
  return axios<Payload, AxiosResponse<Response>>({
    method,
    url: createUrl(endpoint),
    headers,
    data: payload
  }).then(response => response.data);
};
