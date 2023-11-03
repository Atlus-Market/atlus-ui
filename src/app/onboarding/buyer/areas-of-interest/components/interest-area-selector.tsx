'use client';

import { MouseEvent, ReactNode } from 'react';

import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';
import { atlusIconTagDataId } from '@/components/ui/tag/atlus-icon-tag';

interface InterestAreaSelectorProps {
  children: ReactNode;
}

export const InterestAreaSelector = ({ children }: InterestAreaSelectorProps) => {
  const { updateContext, interestAreasIds } = useOnboardingContext();
  return (
    <div
      onClick={(e: MouseEvent<HTMLElement>) => {
        e?.preventDefault();
        e?.stopPropagation();
        const target = e?.target as HTMLElement;
        const dataSet = target?.closest<HTMLElement>(`[data-${atlusIconTagDataId}]`)?.dataset;
        if (dataSet) {
          const selectedInterestAdreaId: number | undefined = parseInt(
            dataSet[atlusIconTagDataId] || '',
            10
          );
          if (isNaN(selectedInterestAdreaId)) {
            return;
          }

          let updatedInterestAreasIds: number[] = [];
          if (interestAreasIds.includes(selectedInterestAdreaId)) {
            updatedInterestAreasIds = interestAreasIds.filter(id => id !== selectedInterestAdreaId);
          } else {
            updatedInterestAreasIds = [...interestAreasIds, selectedInterestAdreaId];
          }
          updateContext({
            interestAreasIds: updatedInterestAreasIds,
          });
        }
      }}
    >
      {children}
    </div>
  );
};
