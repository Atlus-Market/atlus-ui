import { jwtDecode } from 'jwt-decode';
import { getUnixTime } from 'date-fns';

export const hasTokenExpired = (jwt: string): boolean => {
  const decoded = jwtDecode(jwt);
  const tokenExpiresAt = decoded?.exp ?? 0;
  const now = getUnixTime(new Date());
  return tokenExpiresAt < now;
};
