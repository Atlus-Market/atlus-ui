'use client';

import { ForgotPasswordForm } from '@/app/(auth)/forgot-password/components/forgot-password-form';
import { forgotPassword } from '@/api/auth/forgot-password';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const ForgotPassword = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      router.push(`${window.location.pathname}/email-sent`);
    }
  });

  return (
    <ForgotPasswordForm
      isLoading={mutation.isLoading}
      onSubmit={mutation.mutateAsync}
      errorMessage={mutation.error?.toString()}
    />
  );
};
