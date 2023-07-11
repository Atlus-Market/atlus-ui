'use client';

import { OnboardingContainer } from '@/app/onboarding/components/onboarding-container';
import { Footer } from '@/app/onboarding/footer';
import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';
import { ReactNode } from 'react';
import {
  SetOnboardingProgress
} from '@/app/onboarding/components/onboarding-progress-bar/set-onboarding-progress';

export default function CreateAccountLayout({ children }: { children: ReactNode; }) {
  const { isCreatingAccount, createAccountFormSubmitter } =
    useOnboardingContext();
  return (
    <OnboardingContainer
      footer={
        <Footer
          shouldSkip={false}
          nextBtnText='Done'
          nextBtnType='submit'
          isNextBtnLoading={isCreatingAccount}
          onNextClick={() => {
            createAccountFormSubmitter?.();
          }}
        />
      }
    >
      <SetOnboardingProgress pageNumber={5} />
      {children}
    </OnboardingContainer>
  );
}
