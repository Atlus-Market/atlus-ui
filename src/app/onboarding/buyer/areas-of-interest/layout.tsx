import { InterestAreaFooter } from '@/app/onboarding/buyer/areas-of-interest/components/interest-area-footer';
import { OnboardingContainer } from '@/app/onboarding/components/onboarding-container';
import { SetOnboardingProgress } from '@/app/onboarding/components/onboarding-progress-bar/set-onboarding-progress';
import { ReactNode } from 'react';

export default function AreaOfInterestLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <OnboardingContainer footer={<InterestAreaFooter />}>
      <SetOnboardingProgress pageNumber={1} />
      {children}
    </OnboardingContainer>
  );
}
