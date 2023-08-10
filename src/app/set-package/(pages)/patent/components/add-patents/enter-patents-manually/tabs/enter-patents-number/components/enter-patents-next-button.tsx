'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectActivePatentsIds,
  selectIsActiveTabValid
} from '@/redux/features/set-package/selectors/add-patents-selectors';
import { useQuery } from '@tanstack/react-query';
import { getPatents, GetPatentsPayload } from '@/api/patents/get-patents';
import { setAddPatentsStep, setFetchedPatents } from '@/redux/features/set-package/set-package';
import {
  AddPatentsStep
} from '@/app/set-package/(pages)/patent/components/add-patents/add-patents-step';

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
    enabled: false, // disable this query from automatically running,
  });

  const onNext = async () => {
    if (!isActiveFormValid) {
      return;
    }

    const response = await refetch();
    console.log('fetchPatents response: ', response);
    dispatch(setFetchedPatents({ patents: response.data?.patents ?? [] }));
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
