'use client';

import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectActiveDataroom,
  selectDataroom,
  selectDocumentsState
} from '@/redux/features/set-package/selectors/documents.selectors';
import { setDataroom } from '@/redux/features/set-package/set-package';
import {
  useFetchDataroom
} from '@/app/set-package/(pages)/documents/components/use-fetch-dataroom';

interface DocumentsProviderProps {
  children: ReactNode;
}

export const DocumentsProvider = ({ children }: DocumentsProviderProps) => {
  const dataroomId = useAppSelector(selectActiveDataroom) ?? '';
  const dispatch = useAppDispatch();
  const dataroom = useAppSelector(selectDataroom);

  const docsState = useAppSelector(selectDocumentsState);
  console.log('DocumentsState: ', docsState);

  const { fetchStatus, isLoading, data, error, ...rest } = useFetchDataroom(dataroomId);

  useEffect(() => {
    if (data) {
      dispatch(setDataroom(data));
    }
  }, [data, dispatch]);

  if (!dataroomId) {
    return (<div>You must create a package first to upload files.</div>);
  }

  if (error) {
    console.log(error);
    return <div>Error while loading dataroom id: {dataroomId}</div>;
  }

  if (isLoading) {
    return <div>Loading dataroom...</div>;
  }

  console.log('Dataroom: ', dataroom);
  return (
    <>
      {children}
    </>
  );
};
