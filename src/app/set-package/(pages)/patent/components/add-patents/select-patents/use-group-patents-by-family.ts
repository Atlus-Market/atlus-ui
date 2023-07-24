import { Patent } from '@/models/patent';
import {
  PatentTableData
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/patents-table';
import { useMemo } from 'react';
import { groupBy } from 'lodash';

interface UseGroupPatentsByFamilyProps {
  patents: Patent[];
}

const NO_FAMILY_GROUP_ID = 'no-family';

export const useGroupPatentsByFamily = ({ patents }: UseGroupPatentsByFamilyProps): PatentTableData[] => {
  return useMemo(() => {
    const groupedPatents = groupBy(patents, (patent: Patent) => patent.familyId || NO_FAMILY_GROUP_ID);
    return Object.keys(groupedPatents).map(familyIdKey => ({
      familyId: familyIdKey,
      publicationNumber: `familyId: ${familyIdKey}`,
      applicationDateEpodoc: 'applicationDateEpodoc',
      applicantsOriginal: [],
      title: 'title',
      status: 'status',
      applicationNumber: 'applicationNumber',
      subRows: groupedPatents[familyIdKey]
    }));
  }, [patents]);
};
