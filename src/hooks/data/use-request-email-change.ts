import { useMutation } from '@tanstack/react-query';
import { requestEmailChange } from '@/api/user/request-email-change';

export const useRequestEmailChange = (userId: string) => {
  return useMutation({
    mutationFn: (email: string) => {
      return requestEmailChange(userId, email);
    },
  });
};
