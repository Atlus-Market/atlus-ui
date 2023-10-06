import { Patent } from '@/models/patent';
import { PatentTableData } from '@/app/set-package/[id]/(pages)/patents/components/add-patents/select-patents/components/patents-table';
import { useMemo } from 'react';
import { useGroupPatentsByFamilyId } from '@/app/set-package/[id]/(pages)/patents/components/patents-family-list/use-group-patents-by-family-id';

interface UseGroupPatentsByFamilyProps {
  patents: Patent[];
}

export const NO_FAMILY_GROUP_ID = ''; // MUST BE EMPTY STRING because custom patents have familyId: ''

export const useTableGroupPatentsByFamily = ({
  patents,
}: UseGroupPatentsByFamilyProps): PatentTableData[] => {
  const groupedPatents = useGroupPatentsByFamilyId({ patents });

  return useMemo(() => {
    const familyIdKeys = Object.keys(groupedPatents);

    return familyIdKeys.map(familyIdKey => ({
      familyId: familyIdKey,
      publicationNumber: '',
      applicationDate: '',
      title: '',
      status: '',
      applicationNumber: '',
      patentNumber: '',
      applicants: [],
      subRows: groupedPatents[familyIdKey],
    }));
  }, [groupedPatents]);
};
