'use client';

import Link from 'next/link';
import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';
import { ReactNode } from 'react';
import { UserType } from '@/models/user-type';
import { OnboardingBrokerCreateAccount, OnboardingBuyerInterestAreas } from '@/constants/routes';

interface SelectedCardHandlerProps {
  children: ReactNode;
  userType: UserType;
}

export const SelectedCardHandler = ({
                                      children,
                                      userType
                                    }: SelectedCardHandlerProps) => {
  const { updateContext } = useOnboardingContext();

  const link = userType === 'broker' ?
    OnboardingBrokerCreateAccount :
    OnboardingBuyerInterestAreas;

  return (
    <Link
      href={link}
      onClick={() => {
        updateContext({
          userType
        });
      }}
    >
      {children}
    </Link>
  );
};
