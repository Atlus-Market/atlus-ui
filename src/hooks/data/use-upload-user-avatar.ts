import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';
import { uploadUserAvatar } from '@/api/user/upload-user-avatar';

export const useUploadUserAvatar = () => {
  const mutation = useMutation({
    mutationFn: async (avatar: File): Promise<void> => {
      return uploadUserAvatar({ avatar });
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
