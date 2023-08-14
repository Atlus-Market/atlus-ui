'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectActivePatentsIds,
  selectIsActiveTabValid
} from '@/redux/features/set-package/selectors/add-patents-selectors';
import { useQuery } from '@tanstack/react-query';
import { getPatents, GetPatentsPayload } from '@/api/patents/get-patents';
import { setAddPatentsStep, setPatents } from '@/redux/features/set-package/set-package';
import {
  AddPatentsStep
} from '@/app/set-package/(pages)/patents/components/add-patents/add-patents-step';
import { Patent } from '@/models/patent';
import {
  NO_FAMILY_GROUP_ID
} from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/use-group-patents-by-family';


const createPatentManually = (patentData: Partial<Patent>): Patent => ({
  publicationNumber: '',
  status: '',
  applicationReferenceEpodoc: {
    date: ''
  },
  applicationNumber: '',
  applicantsOriginal: [],
  familyId: NO_FAMILY_GROUP_ID,
  title: '',
  ...patentData
});

export const EnterPatentsNextButton = () => {
  const dispatch = useAppDispatch();
  const isActiveFormValid = useAppSelector(selectIsActiveTabValid);
  const selectedPatentsId = useAppSelector(selectActivePatentsIds);

  const getPatentsPayload: GetPatentsPayload = {
    ids: selectedPatentsId
  };

  const { refetch, isRefetching, isFetching } = useQuery({
    queryKey: ['patents/bulk', getPatentsPayload],
    queryFn: () => getPatents(getPatentsPayload),
    refetchOnWindowFocus: false,
    enabled: false // disable this query from automatically running,
  });

  const onNext = async () => {
    if (!isActiveFormValid) {
      return;
    }

    const response = await refetch();
    const fetchedPatents = response.data?.patents ?? [];
    const fetchedPatentsIds = fetchedPatents.map(patent => patent.publicationNumber);
    console.log('selectedPatentsId: ', selectedPatentsId);
    console.log('fetchedPatents: ', fetchedPatents);
    console.log('fetchedPatentsIds: ', fetchedPatentsIds);

    const notFoundPatents = selectedPatentsId
      .filter(patentId => !fetchedPatentsIds.includes(patentId))
      .map((patentId): Patent => createPatentManually({ publicationNumber: patentId }));

    console.log('notFoundPatents: ', notFoundPatents);

    const patents = [
      ...fetchedPatents,
      ...notFoundPatents
    ];

    dispatch(setPatents({ patents }));
    dispatch(setAddPatentsStep(AddPatentsStep.SelectPatents));
  };

  return (
    <AtlusButton
      disabled={!isActiveFormValid || isRefetching || isFetching}
      isLoading={isRefetching || isFetching}
      onClick={onNext}>
      Next
    </AtlusButton>
  );
};
