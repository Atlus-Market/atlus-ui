import { useMutation } from '@tanstack/react-query';
import { changePassword } from '@/api/auth/change-password';

interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => {
      return changePassword(payload);
    },
  });
};
