'use client';

import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';
import { Footer } from '@/app/onboarding/footer';

export const CreateBuyerFooter = () => {
  const { isCreatingAccount, createAccountFormSubmitter } = useOnboardingContext();
  return (
    <Footer
      shouldSkip={false}
      nextBtnText="Done"
      nextBtnType="submit"
      isNextBtnLoading={isCreatingAccount}
      onNextClick={() => {
        createAccountFormSubmitter?.();
      }}
    />
  );
};
