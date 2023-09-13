import { Patent } from '@/models/patent';
import { useMemo } from 'react';
import { groupBy } from 'lodash';
import { sortPatentsByPublicationNumber } from '@/utils/patents';

interface UseGroupPatentsByFamilyIdProps {
  patents: Patent[];
}

export type FamilyPatentGroup = Record<string, Patent[]>;

export const useGroupPatentsByFamilyId = ({
  patents,
}: UseGroupPatentsByFamilyIdProps): FamilyPatentGroup => {
  return useMemo(() => {
    const groupedPatents = groupBy(patents, (patent: Patent) => patent.familyId);
    const familyIdKeys = Object.keys(groupedPatents);

    familyIdKeys.forEach(familyIdKey => {
      groupedPatents[familyIdKey] = sortPatentsByPublicationNumber(groupedPatents[familyIdKey]);
    });

    return groupedPatents;
  }, [patents]);
};
