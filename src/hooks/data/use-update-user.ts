'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '@/api/user/update-user';
import { useEffect } from 'react';
import { User } from '@/models/user';
import { userQueryKey } from '@/app/(auth)/session/use-atlus-user';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';

interface UseUpdateUserProps {
  userId: string;
}

export const useUpdateUser = ({ userId }: UseUpdateUserProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (userSettings: Partial<User>) => {
      await updateUser(userId, userSettings);
      return userSettings;
    },
  });

  const { isSuccess, data: userSettings } = mutation;

  useEffect(() => {
    if (isSuccess && userSettings) {
      const user = queryClient.getQueryData<User>(userQueryKey);
      queryClient.setQueryData(userQueryKey, {
        ...user,
        ...userSettings,
        fullName: `${userSettings.firstName} ${userSettings.lastName}`,
      });
      queryClient.invalidateQueries(userQueryKey); // Some fields are auto calculated when fetching it
      showSuccessNotification({ text: 'Settings saved successfully!' });
    }
  }, [isSuccess, queryClient, userSettings]);

  return mutation;
};
