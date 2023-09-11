import { OnboardingContainer } from '@/app/onboarding/components/onboarding-container';
import { SetOnboardingProgress } from '@/app/onboarding/components/onboarding-progress-bar/set-onboarding-progress';
import { ReactNode } from 'react';

export default function UserTypeLayout({ children }: { children: ReactNode }) {
  return (
    <OnboardingContainer>
      <SetOnboardingProgress pageNumber={0} />
      {children}
    </OnboardingContainer>
  );
}
