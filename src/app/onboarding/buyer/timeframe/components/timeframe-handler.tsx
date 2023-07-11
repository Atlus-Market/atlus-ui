'use client';

import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';
import { ReactNode } from 'react';
import { Timeframe } from '@/models/user';

interface SelectedCardHandlerProps {
  children: ReactNode;
  timeframe: Timeframe;
}

export const TimeframeHandler = ({
  children,
  timeframe,
}: SelectedCardHandlerProps) => {
  const { updateContext, timeframe: currentTimeframe } = useOnboardingContext();

  return (
    <div
      className="flex-shrink-0"
      onClick={() => {
        updateContext({
          timeframe: currentTimeframe !== timeframe ? timeframe : undefined,
        });
      }}
    >
      {children}
    </div>
  );
};
