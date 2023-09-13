import { useAtlusSession } from '@/app/(auth)/session/use-atlus-session';
import { User } from 'next-auth';

export const useAtlusUser = (): User | undefined => {
  const session = useAtlusSession();
  return session.data?.user;
};
