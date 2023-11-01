import { useAtlusSession } from '@/app/(auth)/session/use-atlus-session';

export const useHasAtlusSession = (): boolean => {
  const session = useAtlusSession();
  return session.status === 'authenticated';
};
