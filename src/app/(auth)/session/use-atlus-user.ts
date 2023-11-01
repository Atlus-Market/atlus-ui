import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getCurrentUser } from '@/api/user/get-current-user';
import { User } from '@/models/user';
import { useHasAtlusSession } from '@/app/(auth)/session/use-has-atlus-session';

// https://github.com/nextauthjs/next-auth/discussions/4229
// Update the user: https://next-auth.js.org/getting-started/client#updating-the-session

export const useAtlusUser = (): UseQueryResult<User, unknown> => {
  const hasAtlusSession = useHasAtlusSession();
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getCurrentUser(),
    staleTime: 1000 * 60 * 5, // 5 min,
    enabled: hasAtlusSession,
  });
};
