import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';
import { uploadUserAvatar } from '@/api/user/upload-user-avatar';
import { useRefreshUser } from '@/hooks/data/use-refresh-user';
import { uploadUserCompanyLogo } from '@/api/user/upload-user-company-logo';

export const useUploadUserCompanyLogo = () => {
  const refreshUser = useRefreshUser();
  const mutation = useMutation({
    mutationFn: async (avatar: File): Promise<void> => {
      await uploadUserCompanyLogo({ logo: avatar });
      await refreshUser();
    },
  });

  const { isSuccess, data } = mutation;

  useEffect(() => {
    if (isSuccess) {
      showSuccessNotification({ text: 'Company logo updated successfully!' });
    }
  }, [isSuccess]);

  return mutation;
};
