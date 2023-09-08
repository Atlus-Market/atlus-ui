import { useQuery } from '@tanstack/react-query';
import { getPackages } from '@/api/package/get-packages';
import { useAtlusSession } from '@/app/(auth)/session/use-atlus-session';

export const useFetchPackagesList = () => {
  const session = useAtlusSession();
  // @ts-ignore
  const userId = session.data?.user?.id ?? '';

  return useQuery({
    queryKey: ['packages/user', userId],
    queryFn: () => getPackages(userId)
  });
};
