'use client';

import { Footer } from '@/app/onboarding/footer';
import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';

export const CreateBrokerFooter = () => {
  const { isCreatingAccount, createAccountFormSubmitter } = useOnboardingContext();
  return (
    <Footer
      shouldSkip={false}
      nextBtnText="Sign up"
      nextBtnType="submit"
      isNextBtnLoading={isCreatingAccount}
      onNextClick={() => {
        createAccountFormSubmitter?.();
      }}
    />
  );
};
