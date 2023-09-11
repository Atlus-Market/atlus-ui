'use client';

import { Footer } from '@/app/onboarding/footer';
import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';

export const InterestAreaFooter = () => {
  const { interestAreasIds } = useOnboardingContext();
  const hasInterestAreasSelected = interestAreasIds.length > 0;

  return <Footer shouldSkip={!hasInterestAreasSelected} nextUrl="jurisdictions-of-interest" />;
};
