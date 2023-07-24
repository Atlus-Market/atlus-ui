import { Patent } from '@/models/patent';
import {
  PatentTableData
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/patents-table';
import { useMemo } from 'react';
import { groupBy } from 'lodash';

interface UseGroupPatentsByFamilyProps {
  patents: Patent[];
}

export const NO_FAMILY_GROUP_ID = 'US000000000000';

export const useGroupPatentsByFamily = ({ patents }: UseGroupPatentsByFamilyProps): PatentTableData[] => {
  return useMemo(() => {
    const m = patents.map(patent => ({
      ...patent,
      publicationNumber: Math.random().toString(),
      applicationNumber: Math.random().toString(),
      familyId: patent.familyId || NO_FAMILY_GROUP_ID
    }));
    console.log('m: ', m);
    const groupedPatents = groupBy(m, (patent: Patent) => patent.familyId);
    console.log('groupedPatents: ', groupedPatents);

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
