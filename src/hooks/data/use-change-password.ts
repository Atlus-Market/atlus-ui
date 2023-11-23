import { useMutation } from '@tanstack/react-query';
import { sleep } from '@/utils/sleep';

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (payload: ChangePasswordPayload) => {
      await sleep(2000);
    },
  });
};
