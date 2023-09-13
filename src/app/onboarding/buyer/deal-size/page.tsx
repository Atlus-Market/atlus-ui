import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { DealSizeCardSelector } from '@/app/onboarding/buyer/deal-size/components/deal-size-card-selector';

export default function DealSizePage() {
  return (
    <>
      <AtlusTitle text="What’s your typical deal size?" className="mb-12 text-center" />
      <DealSizeCardSelector />
    </>
  );
}
