'use client';

import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';
import { useEffect } from 'react';

interface SetOnboardingProgressProps {
  pageNumber: number;
}

export const OnboardingPagesCount = 7;

export const SetOnboardingProgress = ({ pageNumber }: SetOnboardingProgressProps) => {
  const { updateContext, progress: onboardingProgress } = useOnboardingContext();

  useEffect(() => {
    const progress = (pageNumber * 100) / (OnboardingPagesCount - 1);
    if (progress === onboardingProgress) {
      return;
    }
    updateContext({
      progress,
    });
  }, [pageNumber, updateContext, onboardingProgress]);

  return null;
};
