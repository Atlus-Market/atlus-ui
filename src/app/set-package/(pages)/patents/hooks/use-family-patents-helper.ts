import { useMemo } from 'react';
import { Patent } from '@/models/patent';
import {
  useGroupPatentsByFamilyId
} from '@/app/set-package/(pages)/patents/components/patents-family-list/use-group-patents-by-family-id';

export const useFamilyPatentsHelper = (patents: Patent[]) => {
  const groupedPatents = useGroupPatentsByFamilyId({ patents });

  return useMemo(() => {
    const familyIds = Object.keys(groupedPatents);
    const familiesCount = familyIds.length;
    const patentsCount = Object.values(groupedPatents).reduce((count, patents) => {
      return count + patents.length;
    }, 0);

    return {
      familyIds,
      familiesCount,
      patentsCount
    };
  }, [groupedPatents]);
};
