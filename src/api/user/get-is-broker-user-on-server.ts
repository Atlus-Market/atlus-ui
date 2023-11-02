import 'server-only';
import { cache } from 'react';
import { getCurrentUserOnServer } from '@/api/user/get-current-user-on-server';

export const revalidate = 3600; // revalidate the data at most every hour

export const getIsBrokerUser = cache(async () => {
  const user = await getCurrentUserOnServer();
  return user.broker;
});
