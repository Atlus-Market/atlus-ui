'use client';

import { ReactNode, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDataroom } from '@/api/dataroom/get-dataroom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectActiveDataroom,
  selectDataroom,
  selectDocumentsState
} from '@/redux/features/set-package/selectors/documents.selectors';
import { setDataroom } from '@/redux/features/set-package/set-package';

interface DocumentsProviderProps {
  children: ReactNode;
}

export const DocumentsProvider = ({ children }: DocumentsProviderProps) => {
  const dataroomId = useAppSelector(selectActiveDataroom) ?? '';
  const dispatch = useAppDispatch();
  const dataroom = useAppSelector(selectDataroom);

  const docsState = useAppSelector(selectDocumentsState);
  console.log('DocumentsState: ', docsState);

  const { isLoading, data, error, ...rest } = useQuery({
    queryKey: ['dataroom', dataroomId],
    queryFn: () => getDataroom(dataroomId),
    refetchOnWindowFocus: true,
    enabled: !!dataroomId // disable this query from automatically running if no dataroomId
  });

  console.log('rest: ', rest);

  useEffect(() => {
    if (data) {
      dispatch(setDataroom(data));
    }
  }, [data, dispatch]);

  if (error) {
    console.log(error);
    return <div>Error while loading dataroom id: {dataroomId}</div>;
  }

  const isFetching = rest.fetchStatus === 'fetching';
  if (isFetching) {
    return <div>Loading dataroom...</div>;
  }

  console.log('Dataroom: ', dataroom);
  return (
    <>
      {children}
    </>
  );
};
