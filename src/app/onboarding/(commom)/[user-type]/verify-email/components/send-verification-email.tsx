'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useParams, useRouter } from 'next/navigation';
import { UserType } from '@/models/user-type';
import { HiCheckCircle } from 'react-icons/hi2';
import { useMutation } from '@tanstack/react-query';
import { resendConfirmationEmail } from '@/api/auth/resend-confirmation-email';
import { getOnboardingEmail } from '@/services/auth.service';
import { defaultErrorMessage } from '@/constants/api';
import { AtlusSubTitle } from '@/components/ui/typography/atlus-subtitle';
import { useEffect } from 'react';
import { LoginRoute } from '@/constants/routes';

const brokerText = 'You’re almost there! We sent a verification link to your email. ' +
  'Click on the link to start setting up packages, generate new leads, and close deals faster.';

const buyerText = 'You’re almost there! We sent a verification link to your email. Click on' +
  ' the link to start discovering new packages, negotiate privately, and' +
  ' close deals faster from your dashboard.';

export const SendVerificationEmail = () => {
  const params = useParams();
  const router = useRouter();
  const isBroker = params['user-type'] as UserType === 'broker';

  const mutation = useMutation({
    mutationFn: () => {
      const email = getOnboardingEmail() || '';
      return resendConfirmationEmail({ email });
    }
  });
  const { isLoading: isLoadingMutation, isSuccess, isError, error, data } = mutation;
  console.log('error: ', error);
  const isFirstTime = !isLoadingMutation && !error && !data;

  useEffect(() => {
    const email = getOnboardingEmail();
    if (!email) {
      router.replace(LoginRoute);
    }
  }, []);

  return (
    <>
      <h4 className='text-sm md:text-base font-normal text-center mb-12'>
        {isBroker ? brokerText : buyerText}
      </h4>

      {isLoadingMutation ? <AtlusSubTitle text='Sending verification email...' /> :
        <>
          {isError && <AtlusSubTitle text={defaultErrorMessage} className='mb-4' />}
          <AtlusButton variant='clear' color='orange' className='mb-4'
                       onClick={() => mutation.mutate()}>
            Resend verification email
          </AtlusButton>

          {(isFirstTime || isSuccess) &&
            <div className='flex justify-center items-center'>
              <HiCheckCircle className='mr-[6px]' />
              <span>Email Sent</span>
            </div>
          }
        </>
      }
    </>
  );
};
