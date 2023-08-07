import { useMutation } from '@tanstack/react-query';
import { getOnboardingEmail } from '@/services/auth.service';
import { resendConfirmationEmail } from '@/api/auth/resend-confirmation-email';
import { AtlusSubTitle } from '@/components/ui/typography/atlus-subtitle';
import { defaultErrorMessage } from '@/constants/api';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiCheckCircle } from 'react-icons/hi2';


export const SendVerificationEmailButton = () => {
  const mutation = useMutation({
    mutationFn: () => {
      const email = getOnboardingEmail() || '';
      return resendConfirmationEmail({ email });
    }
  });

  const { isLoading: isLoadingMutation, isSuccess, isError } = mutation;

  return (
    <>
      {isLoadingMutation ? <AtlusSubTitle text='Sending verification email...' /> :
        <>
          {isError && <AtlusSubTitle text={defaultErrorMessage} className='mb-4 text-xs' />}

          <AtlusButton
            variant='clear'
            color='orange'
            className='mb-4'
            onClick={() => mutation.mutate()}>
            Resend verification email
          </AtlusButton>

          {isSuccess &&
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
