'use client';

import { OnboardingContainer } from '@/app/onboarding/components/onboarding-container';
import {
  SetOnboardingProgress
} from '@/app/onboarding/components/onboarding-progress-bar/set-onboarding-progress';
import { ReactNode } from 'react';
import { Footer } from '@/app/onboarding/footer';
import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';

export default function BrokerCreateAccountLayout({ children }: { children: ReactNode; }) {
  const { isCreatingAccount, createAccountFormSubmitter } =
    useOnboardingContext();
  return (
    <OnboardingContainer footer={
      <Footer
        shouldSkip={false}
        nextBtnText='Sign up'
        nextBtnType='submit'
        isNextBtnLoading={isCreatingAccount}
        onNextClick={() => {
          createAccountFormSubmitter?.();
        }}
      />
    }>
      <SetOnboardingProgress pageNumber={3} />
      {children}
    </OnboardingContainer>
  );
}
