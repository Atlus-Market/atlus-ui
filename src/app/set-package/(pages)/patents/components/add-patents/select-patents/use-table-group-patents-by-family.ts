import { Patent } from '@/models/patent';
import {
  PatentTableData
} from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/components/patents-table';
import { useMemo } from 'react';
import {
  useGroupPatentsByFamilyId
} from '@/app/set-package/(pages)/patents/components/patents-family-list/use-group-patents-by-family-id';

interface UseGroupPatentsByFamilyProps {
  patents: Patent[];
}

export const NO_FAMILY_GROUP_ID = 'NO_FAMILY_GROUP_ID';

export const useTableGroupPatentsByFamily = ({ patents }: UseGroupPatentsByFamilyProps): PatentTableData[] => {
  const groupedPatents = useGroupPatentsByFamilyId({ patents });

  return useMemo(() => {
    const familyIdKeys = Object.keys(groupedPatents);

    return familyIdKeys.map(familyIdKey => ({
      familyId: familyIdKey,
      publicationNumber: '',
      applicationReferenceEpodoc: {
        date: ''
      },
      applicantsOriginal: [],
      title: '',
      status: '',
      applicationNumber: '',
      subRows: groupedPatents[familyIdKey]
    }));
  }, [groupedPatents]);
};
