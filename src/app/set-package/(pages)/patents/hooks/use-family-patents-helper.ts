import { FamilyPatents } from '@/redux/features/set-package/set-package';
import { useMemo } from 'react';

export const useFamilyPatentsHelper = (familyPatents: FamilyPatents) => {
  return useMemo(() => {
    const familyIds = Object.keys(familyPatents);
    const familiesCount = familyIds.length;
    const patentsCount = Object.values(familyPatents).reduce((count, patents) => {
      return count + patents.length;
    }, 0);

    return {
      familyIds,
      familiesCount,
      patentsCount
    };
  }, [familyPatents]);
};
