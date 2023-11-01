import { DashboardRoute, LoginRoute } from '@/constants/routes';
import { SignInResponse } from 'next-auth/react';

const callbackUrlKey = 'callbackUrl';

export const createLoginWithCallbackUrl = (redirectPath: string): string => {
  const searchParams = new URLSearchParams();
  searchParams.append(callbackUrlKey, redirectPath);
  return `${LoginRoute}/?${searchParams.toString()}`;
};

export const getRedirectUrl = (signInResponse: SignInResponse | undefined): string => {
  try {
    if (signInResponse?.url) {
      const url = new URL(signInResponse.url);
      const callbackUrl = url.searchParams.get('callbackUrl');
      return callbackUrl || DashboardRoute;
    }
  } catch (e) {}
  return DashboardRoute;
};
