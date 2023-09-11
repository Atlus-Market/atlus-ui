'use client';

import {
  ResetPasswordForm,
  ResetPasswordFormSchema,
} from '@/app/(auth)/password/components/reset-password-form';
import { useParams, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/api/auth/reset-password';
import { PasswordResetRoute } from '@/constants/routes';

export const ResetPassword = () => {
  const params = useParams();
  const resetPasswordToken = params['reset-password-token'] as string;
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (formPassword: ResetPasswordFormSchema) => {
      await resetPassword(resetPasswordToken, formPassword);
    },
    onSuccess: () => {
      router.push(`${PasswordResetRoute}/success`);
    },
  });
  return (
    <ResetPasswordForm
      onSubmit={mutation.mutateAsync}
      isLoading={mutation.isLoading}
      errorMessage={mutation.error?.toString()}
    />
  );
};
