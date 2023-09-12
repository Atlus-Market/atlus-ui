import { Patent } from '@/models/patent';
import { useMemo } from 'react';
import { groupPatentsByFamily } from '@/utils/patents';

interface UseGroupPatentsByFamilyIdProps {
  patents: Patent[];
}

export type FamilyPatentGroup = Record<string, Patent[]>;

export const useGroupPatentsByFamilyId = ({
  patents,
}: UseGroupPatentsByFamilyIdProps): FamilyPatentGroup => {
  return useMemo(() => groupPatentsByFamily(patents), [patents]);
};
