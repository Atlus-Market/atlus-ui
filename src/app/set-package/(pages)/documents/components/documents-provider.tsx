'use client';

import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectActiveDataroom } from '@/redux/features/set-package/selectors/documents.selectors';
import { setDataroom } from '@/redux/features/set-package/set-package';
import { useFetchDataroom } from '@/app/set-package/(pages)/documents/components/use-fetch-dataroom';
import { addListener } from '@reduxjs/toolkit';
import { uploadPackageDocument } from '@/redux/features/set-package/thunks/upload-documents.thunks';

interface DocumentsProviderProps {
  children: ReactNode;
}

export const DocumentsProvider = ({ children }: DocumentsProviderProps) => {
  const dataroomId = useAppSelector(selectActiveDataroom) ?? '';
  const dispatch = useAppDispatch();

  const { isLoading, data, error, refetch } = useFetchDataroom(dataroomId);

  useEffect(() => {
    if (data) {
      dispatch(setDataroom(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    const unsubscribe = dispatch(
      addListener({
        actionCreator: uploadPackageDocument.fulfilled,
        effect: (action, listenerApi) => {
          refetch();
        },
      })
    );
    return () => {
      // @ts-ignore
      unsubscribe();
    };
  }, [dispatch, refetch]);

  if (!dataroomId) {
    return <div>You must create a package first to upload files.</div>;
  }

  if (error) {
    console.log(error);
    return <div>Error while loading dataroom id: {dataroomId}</div>;
  }

  if (isLoading) {
    return <div>Loading dataroom...</div>;
  }

  return <>{children}</>;
};
