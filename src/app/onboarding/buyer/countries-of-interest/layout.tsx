import { CountriesOfInterestFooter } from '@/app/onboarding/buyer/countries-of-interest/components/countries-of-interest-footer';
import { OnboardingContainer } from '@/app/onboarding/components/onboarding-container';
import { SetOnboardingProgress } from '@/app/onboarding/components/onboarding-progress-bar/set-onboarding-progress';
import { ReactNode } from 'react';

export default function CountriesOfInterestLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <OnboardingContainer footer={<CountriesOfInterestFooter />}>
      <SetOnboardingProgress pageNumber={2} />
      {children}
    </OnboardingContainer>
  );
}
