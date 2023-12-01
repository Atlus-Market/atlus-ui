'use client';

import { useMutation } from '@tanstack/react-query';
import { requestDeleteAccount } from '@/api/user/request-delete-account';

export const useRequestDeleteAccount = () => {
  return useMutation({
    mutationFn: () => requestDeleteAccount(),
  });
};
