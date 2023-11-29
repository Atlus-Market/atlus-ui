import { useRefreshUser } from '@/hooks/data/use-refresh-user';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';
import { removeUserAvatar } from '@/api/user/remove-user-avatar';

export const useRemoveUserAvatar = () => {
  const refreshUser = useRefreshUser();

  const mutation = useMutation({
    mutationFn: async () => {
      await removeUserAvatar();
    },
  });

  const { isSuccess, data: userSettings } = mutation;

  useEffect(() => {
    if (isSuccess) {
      refreshUser({ avatar: '' });
      showSuccessNotification({ text: 'Avatar removed successfully!' });
    }
  }, [isSuccess, refreshUser, userSettings]);

  return mutation;
};
