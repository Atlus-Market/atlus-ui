'use client';

import { useMutation } from '@tanstack/react-query';
import { updateUser } from '@/api/user/update-user';
import { useEffect } from 'react';
import { User } from '@/models/user';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';
import { useRefreshUser } from '@/hooks/data/use-refresh-user';

interface UseUpdateUserProps {
  userId: string;
}

export const useUpdateUser = ({ userId }: UseUpdateUserProps) => {
  const refreshUser = useRefreshUser();

  const mutation = useMutation({
    mutationFn: async (userSettings: Partial<User>) => {
      await updateUser(userId, userSettings);
      return userSettings;
    },
  });

  const { isSuccess, data: userSettings } = mutation;

  useEffect(() => {
    if (isSuccess && userSettings) {
      refreshUser(userSettings);
      showSuccessNotification({ text: 'Settings saved successfully!' });
    }
  }, [isSuccess, refreshUser, userSettings]);

  return mutation;
};
