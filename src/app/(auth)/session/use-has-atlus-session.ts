import { useAtlusSession } from '@/app/(auth)/session/use-atlus-session';

export const useHasAtlusSession = (): boolean => {
  const session = useAtlusSession();
  const hasAtlusInvalidSession = !!session.data?.hasAtlusInvalidSession;
  console.log('hasAtlusInvalidSession: ', hasAtlusInvalidSession);
  return session.status === 'authenticated' && !hasAtlusInvalidSession;
};
