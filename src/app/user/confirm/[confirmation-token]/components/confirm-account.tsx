'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { confirmEmail } from '@/api/auth/confirm-email';
import { useEffect } from 'react';
import { isAxiosError } from 'axios';
import { AtlusSubTitle } from '@/components/ui/typography/atlus-subtitle';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { LoginRoute } from '@/constants/routes';


export const ConfirmAccount = () => {
  const router = useRouter();
  const params = useParams();
  const confirmationToken = params['confirmation-token'];

  const mutation = useMutation({
    mutationFn: confirmEmail
  });

  const { isLoading: isLoadingMutation, isSuccess, isError, mutateAsync, error } = mutation;

  useEffect(() => {
    const executeConfirmEmail = async () => {
      try {
        await mutateAsync({ confirmationToken });

      } catch (e) {
        console.error('errorResponse: ', e);
      }
    };

    executeConfirmEmail();
  }, []);

  const dataError = isAxiosError(error) && error?.response?.data?.msg;
  if (isError && dataError) {
    return (
      <div>
        {dataError}
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div>
        <AtlusSubTitle text='Email confimed. Please login' />
        <AtlusButton
          variant='clear'
          color='orange'
          className='mb-4'
          onClick={() => router.replace(LoginRoute)}>
          Go to Login
        </AtlusButton>
      </div>
    );
  }

  return (
    <div>
      Confirming your email...
    </div>
  );
};
