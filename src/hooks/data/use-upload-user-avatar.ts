import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';
import { uploadUserAvatar } from '@/api/user/upload-user-avatar';
import { useRefreshUser } from '@/hooks/data/use-refresh-user';

export const useUploadUserAvatar = () => {
  const refreshUser = useRefreshUser();
  const mutation = useMutation({
    mutationFn: async (avatar: File): Promise<void> => {
      await uploadUserAvatar({ avatar });
      await refreshUser();
    },
  });

  const { isSuccess, data } = mutation;

  useEffect(() => {
    if (isSuccess) {
      showSuccessNotification({ text: 'User avatar updated successfully!' });
    }
  }, [isSuccess]);

  return mutation;
};
