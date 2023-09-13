'use client';

import { Footer } from '@/app/onboarding/footer';
import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';

export const CountriesOfInterestFooter = () => {
  const { countryCodesIds } = useOnboardingContext();
  return <Footer nextUrl="deal-size" shouldSkip={countryCodesIds.length === 0} />;
};
