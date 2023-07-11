'use client';

import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';
import { ReactNode } from 'react';
import { DealSize } from '@/models/user';

interface SelectedCardHandlerProps {
  children: ReactNode;
  dealSize: DealSize;
}

export const DealSizeHandler = ({
  children,
  dealSize,
}: SelectedCardHandlerProps) => {
  const { updateContext, dealSize: currentDealSize } = useOnboardingContext();

  return (
    <div
      className="flex-shrink-0"
      onClick={() => {
        updateContext({
          dealSize: currentDealSize !== dealSize ? dealSize : undefined,
        });
      }}
    >
      {children}
    </div>
  );
};
