import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';
import { uploadUserAvatar } from '@/api/user/upload-user-avatar';
import { userQueryKey } from '@/app/(auth)/session/use-atlus-user';

export const useUploadUserAvatar = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (avatar: File): Promise<void> => {
      await uploadUserAvatar({ avatar });
      await queryClient.invalidateQueries(userQueryKey); // Some fields are auto calculated when fetching it
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
