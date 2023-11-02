import { useQuery } from '@tanstack/react-query';
import { getUserPackages } from '@/api/package/get-user-packages';
import { useAtlusUser } from '@/app/(auth)/session/use-atlus-user';

export const useGetUserPackages = () => {
  const { data: user } = useAtlusUser();
  const userId = user?.id ?? '';

  return useQuery({
    queryKey: ['packages/user', userId],
    queryFn: () => getUserPackages(userId),
    enabled: !!userId,
  });
};
