'use client';

import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';
import { AtlusTopLoadingBar } from '@/components/ui/top-loading-bar/atlus-top-loading-bar';

export const OnboardingProgressBar = () => {
  const { progress } = useOnboardingContext();

  return <AtlusTopLoadingBar progress={progress} />;
};
