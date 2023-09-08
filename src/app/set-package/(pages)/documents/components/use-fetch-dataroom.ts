import { useQuery } from '@tanstack/react-query';
import { getDataroom } from '@/api/dataroom/get-dataroom';

export const useFetchDataroom = (dataroomId: string) => {
  return useQuery({
    queryKey: ['dataroom', dataroomId],
    queryFn: () => getDataroom(dataroomId),
    refetchOnWindowFocus: true,
    enabled: !!dataroomId, // disable this query from automatically running if no dataroomId
  });
};
