import { Patent } from '@/models/patent';
import {
  PatentTableData
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/patents-table';
import { useMemo } from 'react';
import { groupBy } from 'lodash';

interface UseGroupPatentsByFamilyProps {
  patents: Patent[];
}

export const NO_FAMILY_GROUP_ID = 'NO_FAMILY_GROUP_ID';

export const useGroupPatentsByFamily = ({ patents }: UseGroupPatentsByFamilyProps): PatentTableData[] => {
  return useMemo(() => {
    const m = patents.map(patent => ({
      ...patent,
      familyId: patent.familyId || NO_FAMILY_GROUP_ID
    }));
    const groupedPatents = groupBy(m, (patent: Patent) => patent.familyId);

    return Object.keys(groupedPatents).map(familyIdKey => ({
      familyId: familyIdKey,
      publicationNumber: `publicationNumber:familyId: ${familyIdKey}`,
      applicationDateEpodoc: 'applicationDateEpodoc',
      applicantsOriginal: [],
      title: 'title',
      status: 'status',
      applicationNumber: `applicationNumber:familyId: ${familyIdKey}`,
      subRows: groupedPatents[familyIdKey]
    }));
  }, [patents]);
};
