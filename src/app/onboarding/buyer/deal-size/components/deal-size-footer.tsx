'use client';

import { Footer } from '@/app/onboarding/footer';
import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';

export const DealSizeFooter = () => {
  const { dealSize } = useOnboardingContext();
  return <Footer nextUrl="timeframe" shouldSkip={!dealSize} />;
};
