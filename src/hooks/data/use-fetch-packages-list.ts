import { useQuery } from '@tanstack/react-query';
import { getPackages } from '@/api/package/get-packages';

export const useFetchPackagesList = () => {
  return useQuery({
    queryKey: ['packages'],
    queryFn: () => getPackages()
  });
};
