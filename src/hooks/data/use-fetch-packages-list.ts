import { useQuery } from '@tanstack/react-query';
import { getPackages } from '@/api/package/get-packages';
import { useAtlusUser } from '@/app/(auth)/session/use-atlus-user';

export const useFetchPackagesList = () => {
  const userId = useAtlusUser()?.id ?? '';
  return useQuery({
    queryKey: ['packages/user', userId],
    queryFn: () => getPackages(userId)
  });
};
