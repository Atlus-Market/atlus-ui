import { Patent } from '@/models/patent';
import {
  PatentTableData
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/patents-table';
import { useMemo } from 'react';
import { groupBy } from 'lodash';
import { sortPatentsByPublicationNumber } from '@/utils/patents';

interface UseGroupPatentsByFamilyProps {
  patents: Patent[];
}

export const NO_FAMILY_GROUP_ID = 'NO_FAMILY_GROUP_ID';

export const useGroupPatentsByFamily = ({ patents }: UseGroupPatentsByFamilyProps): PatentTableData[] => {
  return useMemo(() => {
    const groupedPatents = groupBy(patents, (patent: Patent) => patent.familyId);
    const familyIdKeys = Object.keys(groupedPatents);

    familyIdKeys.forEach(familyIdKey => {
      groupedPatents[familyIdKey] = sortPatentsByPublicationNumber(groupedPatents[familyIdKey]);
    });

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
  }, [patents]);
};
