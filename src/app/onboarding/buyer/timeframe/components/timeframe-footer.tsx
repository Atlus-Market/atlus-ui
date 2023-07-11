'use client';

import { Footer } from '@/app/onboarding/footer';
import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';

export const TimeframeFooter = () => {
  const { timeframe } = useOnboardingContext();
  return <Footer nextUrl="create-account" shouldSkip={!timeframe} />;
};
