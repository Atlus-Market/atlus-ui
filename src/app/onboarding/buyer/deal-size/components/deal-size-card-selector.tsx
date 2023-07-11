'use client';

import { DealSizeHandler } from '@/app/onboarding/buyer/deal-size/components/deal-size-handler';
import { AtlusImageCard } from '@/components/ui/atlus-image-card';
import BudgetSmallSvg from '@/public/assets/images/onboarding/budget-small.svg';
import BudgetMediumSvg from '@/public/assets/images/onboarding/budget-medium.svg';
import BudgetLargeSvg from '@/public/assets/images/onboarding/budget-large.svg';
import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';

export const DealSizeCardSelector = () => {
  const { dealSize } = useOnboardingContext();
  return (
    <div className="flex justify-center gap-7 flex-wrap">
      <DealSizeHandler dealSize="small">
        <AtlusImageCard
          image={BudgetSmallSvg}
          title="Small"
          description="Less than $1M"
          isActive={dealSize === 'small'}
        />
      </DealSizeHandler>
      <DealSizeHandler dealSize="medium">
        <AtlusImageCard
          image={BudgetMediumSvg}
          title="Medium"
          description="$1M to $5M"
          isActive={dealSize === 'medium'}
        />
      </DealSizeHandler>
      <DealSizeHandler dealSize="large">
        <AtlusImageCard
          image={BudgetLargeSvg}
          title="Large"
          description="$5M+"
          isActive={dealSize === 'large'}
        />
      </DealSizeHandler>
    </div>
  );
};
