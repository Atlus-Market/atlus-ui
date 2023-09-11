import { OnboardingContainer } from '@/app/onboarding/components/onboarding-container';
import { DealSizeFooter } from '@/app/onboarding/buyer/deal-size/components/deal-size-footer';
import { SetOnboardingProgress } from '@/app/onboarding/components/onboarding-progress-bar/set-onboarding-progress';
import { ReactNode } from 'react';

export default function DealSizeLayout({ children }: { children: ReactNode }) {
  return (
    <OnboardingContainer footer={<DealSizeFooter />}>
      <SetOnboardingProgress pageNumber={3} />
      {children}
    </OnboardingContainer>
  );
}
