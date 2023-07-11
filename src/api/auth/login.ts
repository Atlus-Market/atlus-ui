import { createRequest, ProtectedEndpoint } from '@/api/api';
import { User } from '@/models/user';
import { StatusCodes } from 'http-status-codes';


export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface SignInResponse {
  status: StatusCodes;
  data: {
    msg?: string
  };
}

export const login = (loginPayload: LoginPayload): Promise<LoginResponse> => {
  return createRequest<LoginPayload, User>('/login', 'POST', ProtectedEndpoint.False, loginPayload);
};
