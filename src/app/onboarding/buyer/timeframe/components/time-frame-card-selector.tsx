'use client';

import { TimeframeHandler } from '@/app/onboarding/buyer/timeframe/components/timeframe-handler';
import { AtlusImageCard } from '@/components/ui/atlus-image-card';
import { HiOutlineLightningBolt, HiSearch } from 'react-icons/hi';
import { HiOutlineClock } from 'react-icons/hi2';
import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';

export const TimeFrameCardSelector = () => {
  const { timeframe } = useOnboardingContext();
  return (
    <div className="flex justify-center gap-6 flex-wrap">
      <TimeframeHandler timeframe="now">
        <AtlusImageCard
          title="Ready now"
          description="I'm ready to purchase"
          icon={<HiOutlineLightningBolt className="text-orange" size="34" />}
          size="small"
          isActive={timeframe === 'now'}
        />
      </TimeframeHandler>
      <TimeframeHandler timeframe="soon">
        <AtlusImageCard
          title="Soon"
          description="Need a bit more time"
          icon={<HiOutlineClock className="text-orange" size="34" />}
          size="small"
          isActive={timeframe === 'soon'}
        />
      </TimeframeHandler>
      <TimeframeHandler timeframe="browsing">
        <AtlusImageCard
          title="Just browsing"
          description="Casually exploring options"
          icon={<HiSearch className="text-orange" size="34" />}
          size="small"
          isActive={timeframe === 'browsing'}
        />
      </TimeframeHandler>
    </div>
  );
};
