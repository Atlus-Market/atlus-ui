import { useAtlusSession } from '@/app/(auth)/session/use-atlus-session';
import { User } from 'next-auth';

// https://github.com/nextauthjs/next-auth/discussions/4229
// Update the user: https://next-auth.js.org/getting-started/client#updating-the-session

export const useAtlusUser = (): User | undefined => {
  const session = useAtlusSession();
  return session.data?.user;
};
