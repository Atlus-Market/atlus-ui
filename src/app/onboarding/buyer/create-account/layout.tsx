import { OnboardingContainer } from '@/app/onboarding/components/onboarding-container';
import { ReactNode } from 'react';
import { SetOnboardingProgress } from '@/app/onboarding/components/onboarding-progress-bar/set-onboarding-progress';
import { CreateBuyerFooter } from '@/app/onboarding/buyer/create-account/components/create-buyer-footer';

export default function CreateAccountLayout({ children }: { children: ReactNode }) {
  return (
    <OnboardingContainer footer={<CreateBuyerFooter />}>
      <SetOnboardingProgress pageNumber={5} />
      {children}
    </OnboardingContainer>
  );
}
