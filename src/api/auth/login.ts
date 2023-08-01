import { createUrl } from '@/api/api';
import { StatusCodes } from 'http-status-codes';
import axios, { AxiosResponse } from 'axios';
import { accessTokenCookieName } from '@/constants/api';


export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  accessTokenCookie: string;
}

export interface SignInResponse {
  status: StatusCodes;
  data: {
    msg?: string
  };
}

export const login = (loginPayload: LoginPayload): Promise<LoginResponse> => {
  return axios<LoginPayload, AxiosResponse<LoginResponse>>({
    method: 'POST',
    url: createUrl('/login'),
    data: loginPayload
  }).then(response => {
    const cookies: string[] = response.headers?.['set-cookie'] as string[] ?? [];
    const accessTokenCookie = cookies.find(cookie => cookie.includes(`${accessTokenCookieName}=`));
    return {
      ...response.data,
      accessTokenCookie: accessTokenCookie ?? ''
    };
  });
};
