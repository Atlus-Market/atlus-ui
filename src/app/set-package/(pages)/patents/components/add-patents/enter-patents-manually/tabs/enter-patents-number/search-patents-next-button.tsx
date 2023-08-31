'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectActivePatentsIds,
  selectIsActiveTabValid
} from '@/redux/features/set-package/selectors/add-patents.selectors';
import { useQuery } from '@tanstack/react-query';
import { getPatentsSimpleBulk } from '@/api/patents/get-patents-simple-bulk';
import { useEffect, useMemo, useState } from 'react';
import { queryClient } from '@/api/api-client-provider';
import {
  patentsFetchedSuccessfully
} from '@/redux/features/set-package/slices/add-patents/slices/enter-patents';


const SearchPatentsQueryKey = 'patents/simple/bulk';

export const SearchPatentsNextButton = () => {
  const [mounted, setIsMounted] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const isActiveFormValid = useAppSelector(selectIsActiveTabValid);
  const selectedPatentsId = useAppSelector(selectActivePatentsIds);

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

    const response = await refetch();
    console.log('getPatentsSimpleBulk Response: ', response);
    if (!response.data || !mounted) {
      return;
    }

    dispatch(patentsFetchedSuccessfully(response.data));
  };

  console.log('isRefetching || isFetching: ', isRefetching, isFetching);
  return (
    <AtlusButton
      disabled={!isActiveFormValid || isFetching}
      isLoading={isFetching}
      onClick={onNext}>
      Next
    </AtlusButton>
  );
};
