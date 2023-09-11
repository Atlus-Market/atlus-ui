import { TimeframeFooter } from '@/app/onboarding/buyer/timeframe/components/timeframe-footer';
import { OnboardingContainer } from '@/app/onboarding/components/onboarding-container';
import { SetOnboardingProgress } from '@/app/onboarding/components/onboarding-progress-bar/set-onboarding-progress';
import { ReactNode } from 'react';

export default function TimeframeLayout({ children }: { children: ReactNode }) {
  return (
    <OnboardingContainer footer={<TimeframeFooter />}>
      <SetOnboardingProgress pageNumber={4} />
      {children}
    </OnboardingContainer>
  );
}
