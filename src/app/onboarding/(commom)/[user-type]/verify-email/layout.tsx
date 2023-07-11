import { OnboardingContainer } from '@/app/onboarding/components/onboarding-container';
import {
  OnboardingPagesCount,
  SetOnboardingProgress
} from '@/app/onboarding/components/onboarding-progress-bar/set-onboarding-progress';
import { ReactNode } from 'react';

export default function VerifyEmailLayout({ children }: { children: ReactNode; }) {
  return (
    <OnboardingContainer>
      <SetOnboardingProgress pageNumber={OnboardingPagesCount} />
      {children}
    </OnboardingContainer>
  );
}
