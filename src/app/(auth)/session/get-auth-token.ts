import { getSession } from 'next-auth/react';

export const getAuthToken = async (): Promise<string | undefined> => {
  try {
    const session = await getSession();
    return session?.user?.accessToken;
  } catch (e) {
    return undefined;
  }
};
