'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { confirmEmail } from '@/api/auth/confirm-email';
import { ReactNode, useEffect } from 'react';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { LoginRoute } from '@/constants/routes';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { AtlusSubTitle } from '@/components/ui/typography/atlus-subtitle';
import Image from 'next/image';
import EmailConfirmedSuccess from '@/public/assets/images/onboarding/email-confirmed-success.svg';
import QuestionImage from '@/public/assets/images/question-image.svg';
import { isAxiosError } from 'axios';
import { getOnboardingEmail } from '@/services/auth.service';
import { resendConfirmationEmail } from '@/api/auth/resend-confirmation-email';
import {
  SendVerificationEmail
} from '@/app/onboarding/(commom)/[user-type]/verify-email/components/send-verification-email';
import {
  SendVerificationEmailButton
} from '@/app/onboarding/components/send-verification-email-button';

const PageWrapper = ({ children }: { children: ReactNode }) =>
  <div className='w-full h-full flex items-center justify-center flex-col'>
    {children}
  </div>;

export const ConfirmAccount = () => {
  const router = useRouter();
  const params = useParams();
  const confirmationToken = params['confirmation-token'] as string;

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
  }, [confirmationToken, mutateAsync]);

  const dataError = isAxiosError(error) && error?.response?.data?.msg;
  if (isError && dataError) {
    return (
      <PageWrapper>
        <Image src={QuestionImage} alt='Verification failed' className='mb-[76px]' />
        <AtlusTitle text='Verification failed' className='!text-2xl mb-4 !font-normal' />
        <AtlusSubTitle
          text='We weren’t able to verify your email. Please try again.'
          className='!text-base font-normal mb-8'
        />
        <SendVerificationEmailButton />
      </PageWrapper>
    );
  }

  if (isSuccess) {
    return (
      <PageWrapper>
        <Image src={EmailConfirmedSuccess} alt='Email Confirmed' className='mb-[76px]' />
        <AtlusTitle text='Your email has been verified!' className='!text-2xl mb-4 !font-normal' />
        <AtlusSubTitle
          text='Start exploring Atlus from your dashboard.'
          className='!text-base font-normal mb-8'
        />
        <AtlusButton
          color='orange'
          className='mb-4'
          onClick={() => router.replace(LoginRoute)}>
          Go to Login
        </AtlusButton>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className='flex flex-col justify-center items-center'>
        <AtlusLoadingSpinner hexColor='#D9D9D9' size={48} />
        <span className='text-lg mt-6'>Verifying email...</span>
      </div>
    </PageWrapper>
  );
};
