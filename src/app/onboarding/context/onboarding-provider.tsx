'use client';

import { createContext, ReactNode, useMemo, useState } from 'react';
import { noop } from '@/utils/noop';
import { UserType } from '@/models/user-type';
import { DealSize, Timeframe } from '@/models/user';

export interface IOnboardingContext {
  progress: number;
  userType: UserType | undefined;
  interestAreasIds: number[];
  countryCodesIds: string[];
  dealSize: DealSize | undefined;
  timeframe: Timeframe | undefined;
  isCreatingAccount: boolean;
  updateContext: (context: Partial<IOnboardingContext>) => void;
  createAccountFormSubmitter: null | (() => void);
}

const contextInitialState: IOnboardingContext = {
  progress: 0,
  userType: undefined,
  interestAreasIds: [],
  countryCodesIds: [],
  dealSize: undefined,
  timeframe: undefined,
  isCreatingAccount: false,
  updateContext: noop,
  createAccountFormSubmitter: null,
};

export const OnboardingContext = createContext<IOnboardingContext>(contextInitialState);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [onboardingContext, setOnboardingContext] =
    useState<IOnboardingContext>(contextInitialState);

  const contextValue = useMemo<IOnboardingContext>(() => {
    return {
      ...onboardingContext,
      updateContext: (partialContext: Partial<IOnboardingContext>) => {
        setOnboardingContext({
          ...onboardingContext,
          ...partialContext,
        });
      },
    };
  }, [onboardingContext]);

  return <OnboardingContext.Provider value={contextValue}>{children}</OnboardingContext.Provider>;
};
