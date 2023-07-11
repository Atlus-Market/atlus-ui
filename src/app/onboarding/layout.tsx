import { OnboardingProvider } from '@/app/onboarding/context/onboarding-provider';
import { ReactNode } from 'react';
import { OnboardingProgressBar } from '@/app/onboarding/components/onboarding-progress-bar/onboarding-progress-bar';

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <OnboardingProvider>
      <OnboardingProgressBar />
      {children}
    </OnboardingProvider>
  );
}
