import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { TimeFrameCardSelector } from '@/app/onboarding/buyer/timeframe/components/time-frame-card-selector';
import { AtlusSubTitle } from '@/components/ui/typography/atlus-subtitle';

export default function TimeframePage() {
  return (
    <>
      <AtlusTitle text="What’s your timeframe?" className="mb-4 text-center" />
      <AtlusSubTitle
        text="How soon you’re looking to purchase IP"
        className="text-center mb-12"
      />
      <TimeFrameCardSelector />
    </>
  );
}
