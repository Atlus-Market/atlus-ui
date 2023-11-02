import { useAtlusUser } from '@/app/(auth)/session/use-atlus-user';

export const useIsBrokerUser = (): boolean => {
  const { data: user } = useAtlusUser();
  return !!user?.broker;
};
