import { useContext } from 'react';
import { OnboardingContext } from '@/app/onboarding/context/onboarding-provider';

export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error('userOnboardingContext must be used within the OnboardingProvider');
  }

  return context;
};
