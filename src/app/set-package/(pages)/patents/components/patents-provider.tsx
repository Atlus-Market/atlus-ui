'use client';

import { useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectPackage,
  selectPackagePatents
} from '@/redux/features/set-package/selectors/set-package.selectors';
import { getPatentsBulk } from '@/api/patents/get-patents-bulk';
import { setPackagePatents } from '@/redux/features/set-package/set-package';
import { getPatentsSimpleBulk } from '@/api/patents/get-patents-simple-bulk';

interface PatentsProviderProps {
  children: ReactNode;
}

export const PatentsProvider = ({ children }: PatentsProviderProps) => {
  const dispatch = useAppDispatch();
  const activePackage = useAppSelector(selectPackage);
  const patents = useAppSelector(selectPackagePatents);
  const packagePatentIds = activePackage?.patents;

  const patentsToFetch = useMemo<string[]>(() => {
    const loadedPatentIds = patents.map(patent => patent.publicationNumber);
    return (packagePatentIds ?? []).filter(patentId => !loadedPatentIds.includes(patentId));
  }, [packagePatentIds, patents]);

  console.log('patentsToFetch: ', patentsToFetch);

  const hasPatentsToFetch = patentsToFetch.length > 0;

  const { isLoading, data, error } = useQuery({
    queryKey: ['patents', patentsToFetch],
    queryFn: () => getPatentsSimpleBulk({ ids: patentsToFetch }),
    enabled: hasPatentsToFetch,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data?.patents) {
      dispatch(setPackagePatents(data.patents));
    }
  }, [data, dispatch]);

  if (error) {
    console.log(error);
    return <div>Error while loading patents</div>;
  }

  if (hasPatentsToFetch && isLoading) {
    return (
      <div>Loading patents...</div>
    );
  }

  return (
    <>
      {children}
    </>
  );
};
