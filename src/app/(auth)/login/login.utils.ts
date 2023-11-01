import { DashboardRoute, LoginRoute } from '@/constants/routes';

const callbackUrlKey = 'callbackUrl';

export const createLoginWithCallbackUrl = (redirectPath: string): string => {
  const searchParams = new URLSearchParams();
  searchParams.append(callbackUrlKey, redirectPath);
  return `${LoginRoute}/?${searchParams.toString()}`;
};

export const getRedirectUrl = (searchParams: string | undefined): string => {
  try {
    const urlSearchParams = new URLSearchParams(searchParams ?? '');
    const callbackUrl = urlSearchParams.get('callbackUrl');
    return callbackUrl || DashboardRoute;
  } catch (e) {
    return DashboardRoute;
  }
};
