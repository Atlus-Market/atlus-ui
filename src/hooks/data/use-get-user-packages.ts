import { useQuery } from '@tanstack/react-query';
import { getPackages } from '@/api/package/get-packages';
import { useAtlusUser } from '@/app/(auth)/session/use-atlus-user';

export const useGetUserPackages = () => {
  const { data: user } = useAtlusUser();
  const userId = user?.id ?? '';

  return useQuery({
    queryKey: ['packages/user', userId],
    queryFn: () => getPackages(userId),
    enabled: !!userId,
  });
};
