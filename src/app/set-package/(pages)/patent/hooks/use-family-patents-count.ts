import { FamilyPatents } from '@/redux/features/set-package/set-package';
import { useMemo } from 'react';

export const useFamilyPatentsCount = (familyPatents: FamilyPatents) => {
  return useMemo(() => {
    const familiesCount = Object.keys(familyPatents).length;
    const patentsCount = Object.values(familyPatents).reduce((count, patents) => {
      return count + patents.length;
    }, 0);

    return {
      familiesCount,
      patentsCount
    };
  }, [familyPatents]);
};
