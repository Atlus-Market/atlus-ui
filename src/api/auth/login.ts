import { createServerUrl } from '@/api/api';
import { StatusCodes } from 'http-status-codes';
import axios, { AxiosResponse } from 'axios';
import { accessTokenCookieName, csrfAccessTokenName } from '@/constants/api';
import * as cookieParser from 'cookie';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  accessTokenCookie: string;
  csrfAccessToken: string;
}

export interface SignInResponse {
  status: StatusCodes;
  data: {
    msg?: string
  };
}

type ParsedCookie = {
  [key: string]: string;
  Path: string;
}

export const login = (loginPayload: LoginPayload): Promise<LoginResponse> => {
  return axios<LoginPayload, AxiosResponse<LoginResponse>>({
    method: 'POST',
    url: createServerUrl('/login'),
    data: loginPayload
  }).then(response => {
    const cookies: string[] = response.headers?.['set-cookie'] as string[] ?? [];

    const accessTokenCookie = cookies.find(cookie => cookie.includes(`${accessTokenCookieName}=`));
    const csrfAccessTokenCookie = cookies.find(cookie => cookie.includes(`${csrfAccessTokenName}=`));

    const parsedAccessTokenCookie = cookieParser.parse(accessTokenCookie ?? '') as ParsedCookie;
    const parsedCsrfAccessTokenCookie = cookieParser.parse(csrfAccessTokenCookie ?? '') as ParsedCookie;

    return {
      ...response.data,
      accessTokenCookie: parsedAccessTokenCookie[accessTokenCookieName] ?? '',
      csrfAccessToken: parsedCsrfAccessTokenCookie[csrfAccessTokenName] ?? ''
    };
  });
};
