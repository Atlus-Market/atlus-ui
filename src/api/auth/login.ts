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
  userId: string;
  accessToken: string;
  refreshToken: string;
  accessTokenCookie: string;
  csrfAccessToken: string;
  fullName: string;
}

export interface SignInResponse {
  status: StatusCodes;
  data: {
    msg?: string;
  };
}

type ParsedCookie = {
  [key: string]: string;
  Path: string;
};

export const login = async (loginPayload: LoginPayload): Promise<LoginResponse> => {
  const response = await axios<LoginPayload, AxiosResponse<LoginResponse>>({
    method: 'POST',
    url: createUrl('/login'),
    data: loginPayload,
  });

  const cookies: string[] = (response.headers?.['set-cookie'] as string[]) ?? [];
  const accessTokenCookie = cookies.find(cookie => cookie.includes(`${accessTokenCookieName}=`));

  // Parse the cookie string and extract the access token value
  const parsedCookie = cookieParser.parse(accessTokenCookie || '');
  const accessTokenValue = parsedCookie[accessTokenCookieName] || '';

  const csrfAccessTokenCookie = cookies.find(cookie_1 =>
    cookie_1.includes(`${csrfAccessTokenName}=`)
  );
  const csrfAccessToken = cookieParser.parse(csrfAccessTokenCookie ?? '') as ParsedCookie;

  return {
    ...response.data,
    accessTokenCookie: accessTokenValue, // Use the extracted cookie value
    csrfAccessToken: csrfAccessToken[csrfAccessTokenName] ?? '',
  };
};
