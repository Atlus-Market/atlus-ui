'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectActivePatentsIds,
  selectAddPatentsActiveTab,
  selectIsActiveTabValid
} from '@/redux/features/set-package/selectors/add-patents.selectors';
import { useQuery } from '@tanstack/react-query';
import { setAddPatentsStep, setPatents } from '@/redux/features/set-package/set-package';
import {
  AddPatentsStep
} from '@/app/set-package/(pages)/patents/components/add-patents/add-patents-step';
import { Patent } from '@/models/patent';
import {
  NO_FAMILY_GROUP_ID
} from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/use-table-group-patents-by-family';
import { getPatentsSimpleBulk } from '@/api/patents/get-patents-simple-bulk';
import { useEffect, useMemo, useState } from 'react';
import { queryClient } from '@/api/api-client-provider';
import {
  EnterPatentsNumberTab
} from '@/app/set-package/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/enter-patents-number-tab';
import { uploadPatentsFile } from '@/redux/features/set-package/thunks/upload-patents-file.thunk';


const createPatentManually = (patentData: Partial<Patent>): Patent => ({
  publicationNumber: '',
  status: '',
  applicationNumber: '',
  familyId: NO_FAMILY_GROUP_ID,
  title: '',
  patentNumber: '',
  applicants: [],
  applicationDate: '',
  ...patentData
});

const SearchPatentsQueryKey = 'patents/simple/bulk';

export const EnterPatentsNextButton = () => {
  const [mounted, setIsMounted] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const isActiveFormValid = useAppSelector(selectIsActiveTabValid);
  const selectedPatentsId = useAppSelector(selectActivePatentsIds);
  const addPatentsActiveTab = useAppSelector(selectAddPatentsActiveTab);

  const queryKey = useMemo(() => {
    return [SearchPatentsQueryKey, selectedPatentsId];
  }, [selectedPatentsId]);

  const { refetch, isRefetching, isFetching } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: queryKey,
    queryFn: ({ signal }) => getPatentsSimpleBulk({
      ids: selectedPatentsId
    }, signal),
    refetchOnWindowFocus: false,
    enabled: false // disable this query from automatically running,
  });

  useEffect(() => {
    return () => {
      queryClient.cancelQueries({ queryKey: queryKey });
    };
  }, [queryKey]);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const onNext = async () => {
    if (!isActiveFormValid) {
      return;
    }

    if (addPatentsActiveTab === EnterPatentsNumberTab.ImportFromFile) {
      dispatch(uploadPatentsFile());
      return;
    }

    const response = await refetch();
    console.log('response: ', response);
    if (!response.data || !mounted) {
      return;
    }
    const { patents, customPatents } = response.data;
    const notFoundPatents = customPatents.map(({ publicationNumber }): Patent => createPatentManually({ publicationNumber }));

    console.log('fetchedPatents: ', patents);
    console.log('notFoundPatents: ', notFoundPatents);

    const allPatents = [
      ...patents,
      ...notFoundPatents
    ];

    dispatch(setPatents({ patents: allPatents }));
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
