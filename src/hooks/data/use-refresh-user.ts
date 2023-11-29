import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { User } from '@/models/user';
import { userQueryKey } from '@/app/(auth)/session/use-atlus-user';
import { useRouter } from 'next/navigation';

export const useRefreshUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useCallback(
    async (partialUser?: Partial<User>) => {
      const user = queryClient.getQueryData<User>(userQueryKey);
      const firstName = partialUser?.firstName || user?.firstName;
      const lastName = partialUser?.lastName || user?.lastName;

      queryClient.setQueryData(userQueryKey, {
        ...user,
        ...partialUser,
        fullName: `${firstName} ${lastName}`,
      });
      await queryClient.invalidateQueries(userQueryKey); // Some fields are auto calculated when fetching it
      router.refresh();
    },
    [queryClient, router]
  );
};
