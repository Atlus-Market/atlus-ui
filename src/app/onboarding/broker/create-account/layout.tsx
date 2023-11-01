import { OnboardingContainer } from '@/app/onboarding/components/onboarding-container';
import { SetOnboardingProgress } from '@/app/onboarding/components/onboarding-progress-bar/set-onboarding-progress';
import { ReactNode } from 'react';
import { CreateBrokerFooter } from '@/app/onboarding/broker/create-account/components/create-broker-footer';

export default function BrokerCreateAccountLayout({ children }: { children: ReactNode }) {
  return (
    <OnboardingContainer footer={<CreateBrokerFooter />}>
      <SetOnboardingProgress pageNumber={3} />
      {children}
    </OnboardingContainer>
  );
}
