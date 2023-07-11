'use client';

import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';
import { InterestArea } from '@/api/interest-areas/interest-area';
import { AtlusIconTag } from '@/components/ui/tag/atlus-icon-tag';
import { InterestAreaIconsMap } from '@/app/onboarding/buyer/areas-of-interest/components/interest-area-icons-map';

interface InterestAreasListProps {
  interestAreas: InterestArea[];
}

export const InterestAreasList = ({
  interestAreas,
}: InterestAreasListProps) => {
  const { interestAreasIds } = useOnboardingContext();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
      {interestAreas.map(interestArea => {
        const Icon = InterestAreaIconsMap[interestArea.id];
        return (
          <AtlusIconTag
            isActive={interestAreasIds.includes(interestArea.id)}
            key={interestArea.id}
            id={interestArea.id.toString()}
            text={interestArea.name}
            icon={<Icon />}
          />
        );
      })}
    </div>
  );
};
