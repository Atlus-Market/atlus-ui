import { StatusCodes } from 'http-status-codes';
import axios, { AxiosResponse } from 'axios';
import { accessTokenCookieName, csrfAccessTokenName } from '@/constants/api';
import * as cookieParser from 'cookie';
import { createUrl } from '@/api/api';

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

export const login = async (loginPayload: LoginPayload): Promise<LoginResponse> => {
  const response = await axios<LoginPayload, AxiosResponse<LoginResponse>>({
    method: 'POST',
    url: createUrl('/login'),
    data: loginPayload
  });
  const cookies: string[] = response.headers?.['set-cookie'] as string[] ?? [];
  const accessTokenCookie = cookies.find(cookie => cookie.includes(`${accessTokenCookieName}=`));
  const csrfAccessTokenCookie = cookies.find(cookie_1 => cookie_1.includes(`${csrfAccessTokenName}=`));
  const parsedCsrfAccessToken = cookieParser.parse(csrfAccessTokenCookie ?? '') as ParsedCookie;
  const parsedAccessTokenCookie = cookieParser.parse(accessTokenCookie ?? '') as ParsedCookie;
  return {
    ...response.data,
    accessTokenCookie: parsedAccessTokenCookie[accessTokenCookieName] ?? '',
    csrfAccessToken: parsedCsrfAccessToken[csrfAccessTokenName] ?? ''
  };
};
